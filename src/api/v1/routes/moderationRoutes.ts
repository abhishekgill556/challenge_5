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
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved post
 *       404:
 *         description: Post not found
 */
router.get("/post/:id", getPostById);

/**
 * @swagger
 * /moderation/post/{id}/moderate:
 *   post:
 *     summary: Moderate a post
 *     description: Allows a moderator to take action on a post.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to moderate.
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *       400:
 *         description: Bad request, invalid parameters
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @swagger
 * /moderation/user/{id}/profile:
 *   get:
 *     summary: Retrieve user profile
 *     description: Get details about a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user profile to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @swagger
 * /moderation/user/{id}/flag:
 *   post:
 *     summary: Flag a user
 *     description: Allows a user to be flagged for violating community guidelines.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to flag.
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
 *         description: User flagged successfully
 */
router.post("/user/:id/flag", flagUser);

/**
 * @swagger
 * /moderation/content/flags/stats:
 *   get:
 *     summary: Retrieve flagged content statistics
 *     description: Get statistics on flagged posts and users.
 *     responses:
 *       200:
 *         description: Successfully retrieved flagged content statistics
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
