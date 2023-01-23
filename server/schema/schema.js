const Job = require('../models/Job')
const Interview = require('../models/Interview')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInputObjectType } = require('graphql')

// DEFINE INTERVIEW TYPES
const InterviewType = new GraphQLObjectType({
    name: 'Interview',
    fields: () => ({
        id: { type: GraphQLID },
        interviewDate: { type: GraphQLString, },
        notes: { type: GraphQLString, },
        interviewer: { type: GraphQLString, },
        status: { type: GraphQLString, },
        // RELATIONSHIP WITH JOB DB
        job: {
            type: GraphQLString,
            resolve(parent, args) {
                return Job.findById(parent.jobId)
            }
        }
    })
})


// DEFINE JOB TYPES
const JobType = new GraphQLObjectType({
    name: 'Job',
    fields: () => ({
        id: { type: GraphQLID },
        company: { type: GraphQLString, },
        logo: { type: GraphQLString, },
        jobTitle: { type: GraphQLString, },
        jobDesc: { type: GraphQLString, },
        category: { type: GraphQLString, },
        status: { type: GraphQLString, },
        // RELATIONSHIP WITH INTERVIEW DB
        interview: {
            type: GraphQLString,
            resolve(parent, args) {
                return Interview.findById(parent.interviewId)
            }
        },
        user: {
            type: UsersType,
            resolve(parent, args) {
                return Users.findById(parent.userId)
            }
        }
    })
})


// USER TYPES
const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        hashedPw: { type: GraphQLString }
    })
})


// ! DEFINE INPUT TYPE FOR DATA ARGUMENTS

// USER INPUTS
const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        pw: { type: GraphQLString }
    })
})


// DEFINE ROOT QUERIES
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // JOB & JOBS
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return Job.find(args.id)
            }
        },
        job: {
            type: JobType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Job.findById(args.id)
            }
        },
        // INTERVIEW & INTERVIEWS
        interviews: {
            type: new GraphQLList(InterviewType),
            resolve(parent, args) {
                return Interview.find(args.id)
            }
        },
        interview: {
            type: InterviewType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Interview.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UsersType),
            resolve(parent, args) {
                return Users.find()
            }
        },
        user: {
            type: UsersType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Users.findById(args.id)
            }
        },
        login: {
            type: UsersType,
            args: { data: { type: UserInputType } },
            resolve: async (parent, args) => {

                const username = args.data.username
                const user = await Users.findOne({ username })
                const match = await bcrypt.compare(args.data.pw, user.hashedPw)

                if (match) {
                    return user
                } else {
                    return null
                }

            }
        }
    }
})

// MUTATIONS
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {


        // * ADD USER

        addUser: {
            type: UsersType,
            args: {
                data: { type: UserInputType }
            },
            resolve(parent, args) {

                const registration = async () => {
                    const username = args.data.username
                    const email = args.data.email
                    const password = await bcrypt.hash(args.data.pw, 12)

                    const newUser = new Users({
                        username: username,
                        email: email,
                        hashedPw: password
                    })

                    return await newUser.save()
                }

                return registration()

            }
        },


        // * UPDATE USER

        updateUser: {
            type: UsersType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                data: { type: UserInputType }
            },
            resolve(parent, args) {
                return Users.findByIdAndUpdate(args.id, args.data)
            }
        },


        // * DELETE USER

        deleteUser: {
            type: UsersType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // REMOVE LINKED EXPENSES
                Job.find({ userId: args.id }).then((j) => {
                    j.forEach((project) => {
                        project.remove()
                    })
                })

                return Users.findByIdAndRemove(args.id)
            }
        },


        // * ADD JOB

        addJob: {
            type: JobType,
            args: {
                company: { type: GraphQLString, },
                logo: { type: GraphQLString, },
                jobTitle: { type: GraphQLString, },
                jobDesc: { type: GraphQLString, },
                category: {
                    type: new GraphQLEnumType({
                        name: 'Category',
                        values: {
                            'Design': { value: 'Design' },
                            'Production': { value: 'Production' },
                            'Development': { value: 'Development' },
                        }
                    }),
                    defaultValue: 'Design'
                },
                status: {
                    type: new GraphQLEnumType({
                        name: 'JobStatus',
                        values: {
                            'Interviewing': { value: 'Having an interview' },
                            'Confirmation': { value: 'Email confirmation' },
                            'Ignored': { value: 'Completely Ghosted' },
                        }
                    }),
                    defaultValue: 'Completely Ghosted'
                },
                interviewId: { type: GraphQLID },
                userId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const job = new Job({
                    company: args.company,
                    logo: args.logo,
                    jobTitle: args.jobTitle,
                    jobDesc: args.jobDesc,
                    category: args.category,
                    status: args.status,
                    interviewId: args.interviewId,
                    userId: args.userId
                });
                return job.save()
            }
        },


        // ! DELETE JOB


        deleteJob: {
            type: JobType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // DELETE INTERVIEW LINKED TO THIS JOB
                Interview.find({ interviewId: args.id }).then((jobs) => {
                    jobs.forEach(project => {
                        project.remove()
                    })
                })
                // FINALLY DELETE JOB
                return Job.findByIdAndRemove(args.id)
            }
        },


        // * ADD INTERVIEW


        addInterview: {
            type: InterviewType,
            args: {
                interviewDate: { type: GraphQLString, },
                notes: { type: GraphQLString, },
                interviewer: { type: GraphQLString, },
                status: {
                    type: new GraphQLEnumType({
                        name: 'InterviewStatus',
                        values: {
                            'bad': { value: 'Not great' },
                            'ok': { value: 'Fine' },
                            'good': { value: 'Very good' },
                            'excellent': { value: 'Excellent' },
                            'superp': { value: 'Amazing' }
                        }
                    }),
                },
                // jobId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const interview = new Interview({
                    interviewDate: args.interviewDate,
                    notes: args.notes,
                    interviewer: args.interviewer,
                });
                return interview.save()
            }
        },


        // ! DELETE INTERVIEW


        deleteInterview: {
            type: InterviewType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Interview.findByIdAndDelete(args.id)
            }
        },


        // ? UPDATE JOB


        updateJob: {
            type: JobType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                company: { type: GraphQLString, },
                logo: { type: GraphQLString, },
                jobTitle: { type: GraphQLString, },
                jobDesc: { type: GraphQLString, },
                category: {
                    type: new GraphQLEnumType({
                        // NEEDS AN UNIQUE NAME
                        name: 'CategoryUpdate',
                        values: {
                            'Design': { value: 'Design' },
                            'Production': { value: 'Production' },
                            'Development': { value: 'Development' },
                        }
                    }),
                },
                status: {
                    type: new GraphQLEnumType({
                        name: 'UpdateJobStatus',
                        values: {
                            'Interviewing': { value: 'Having an interview' },
                            'Confirmation': { value: 'Email confirmation' },
                            'Ignored': { value: 'Completely Ghosted' },
                        }
                    }),
                    defaultValue: 'Completely Ghosted'
                },

            },
            resolve(parent, args) {
                return Job.findByIdAndUpdate(
                    args.id, {
                    $set: {
                        company: args.company,
                        logo: args.logo,
                        jobTitle: args.jobTitle,
                        jobDesc: args.jobDesc,
                        category: args.category,
                        status: args.status,
                    }
                },
                    // IF NOT NEW, IT WILL CREATE THE JOB OR FIELD
                    { new: true }
                )
            }
        }


        // ? UPDATE INTERVIEW
    }
})


// EXPORTS
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})