import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex.morgan',
        email: 'alex.morgan@example.com',
        passwordHash: 'seeded-demo-password',
        profile: { displayName: 'Alex Morgan', fitnessGoal: 'Build consistent strength' },
      },
      {
        username: 'jamie.lee',
        email: 'jamie.lee@example.com',
        passwordHash: 'seeded-demo-password',
        profile: { displayName: 'Jamie Lee', fitnessGoal: 'Improve cardiovascular fitness' },
      },
      {
        username: 'riley.chen',
        email: 'riley.chen@example.com',
        passwordHash: 'seeded-demo-password',
        profile: { displayName: 'Riley Chen', fitnessGoal: 'Increase mobility' },
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A balanced team focused on steady progress.',
        ownerId: users[0]._id,
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Momentum',
        description: 'Short, focused sessions before the day begins.',
        ownerId: users[2]._id,
        memberIds: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'Strength training',
        durationMinutes: 45,
        points: 120,
        completedAt: new Date('2026-09-13T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        type: 'Outdoor run',
        durationMinutes: 30,
        points: 90,
        completedAt: new Date('2026-09-14T06:45:00Z'),
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        type: 'Mobility flow',
        durationMinutes: 25,
        points: 75,
        completedAt: new Date('2026-09-14T07:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id, teamId: teams[0]._id, points: 420, rank: 1, period: '2026-W37' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 315, rank: 2, period: '2026-W37' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 280, rank: 3, period: '2026-W37' },
    ]);

    await Workout.insertMany([
      {
        name: 'Foundations Full Body',
        description: 'A practical full-body session for building strength fundamentals.',
        difficulty: 'beginner',
        durationMinutes: 30,
        focusAreas: ['legs', 'core', 'upper body'],
      },
      {
        name: 'Tempo Run Builder',
        description: 'A progressive run designed to improve pace control and stamina.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        focusAreas: ['cardio', 'endurance'],
      },
      {
        name: 'Deep Mobility Reset',
        description: 'A guided sequence for hips, shoulders, and spinal mobility.',
        difficulty: 'beginner',
        durationMinutes: 20,
        focusAreas: ['mobility', 'recovery'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
