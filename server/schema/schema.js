const Job = require('../models/Job')
const Interview = require('../models/Interview')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')

// DEFINE INTERVIEW TYPES
const InterviewType = new GraphQLObjectType({
    name: 'Interview',
    fields: () => ({
        id: { type: GraphQLID },
        InterviewDate: { type: GraphQLString },
        notes: { type: GraphQLString },
        interviewer: { type: GraphQLString },
        status: { type: GraphQLString },
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
        company: { type: GraphQLString, },
        logo: { type: GraphQLString },
        jobTitle: { type: GraphQLString, },
        jobDesc: { type: GraphQLString, },
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
        job: {
            type: JobType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Job.findById(args.id)
            }
        },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return Job.findById(args.id)
            }
        },
        // INTERVIEW & INTERVIEWS
        interview: {
            type: InterviewType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Interview.findById(args.id)
            }
        },
        interviews: {
            type: new GraphQLList(InterviewType),
            resolve(parent, args) {
                return Interview.findById(args.id)
            }
        }
    }
})

// MUTATIONS
