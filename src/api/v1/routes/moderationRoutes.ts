import { Router } from "express";
import {
    moderatePost,
    flagUser,
    getPostById,
    getUserProfile,
    getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @swagger
 * /moderation/post/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     description: Fetch a specific post based on its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     author:
 *                       type: string
 *                     isFlagged:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Post not found.
 */
router.get("/post/:id", getPostById);

/**
 * @swagger
 * /moderation/post/{id}/moderate:
 *   post:
 *     summary: Moderate a post
 *     description: Flags a post for moderation and applies moderation actions.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to moderate.
 *     responses:
 *       200:
 *         description: Post moderated successfully.
 *       400:
 *         description: Invalid request.
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @swagger
 * /moderation/user/{id}/profile:
 *   get:
 *     summary: Get a user's profile
 *     description: Retrieves the profile of a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose profile is being retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *       404:
 *         description: User not found.
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @swagger
 * /moderation/user/{id}/flag:
 *   post:
 *     summary: Flag a user
 *     description: Flags a user for violating community guidelines.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user being flagged.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: The reason for flagging the user.
 *     responses:
 *       200:
 *         description: User flagged successfully.
 *       400:
 *         description: Invalid request.
 */
router.post("/user/:id/flag", flagUser);

/**
 * @swagger
 * /moderation/content/flags/stats:
 *   get:
 *     summary: Get flagged content statistics
 *     description: Retrieves statistics on flagged content, including the number of flagged posts and users.
 *     responses:
 *       200:
 *         description: Flagged content statistics retrieved successfully.
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
