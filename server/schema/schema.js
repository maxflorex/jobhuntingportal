const Job = require('../models/Job')
const Interview = require('../models/Interview')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')

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
    }
})

// MUTATIONS
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {


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
                interviewId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const job = new Job({
                    company: args.company,
                    logo: args.logo,
                    jobTitle: args.jobTitle,
                    jobDesc: args.jobDesc,
                    category: args.category,
                    status: args.status,
                    interviewId: args.interviewId
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
                }
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