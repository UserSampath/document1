import { Challenge, User } from "./../models/model.js"
import sequelize from "../config/db.connection.js"
import { Op } from "sequelize";
import { sendNotification } from "../config/firebase/notification.js";
const challengeRepo = {
    createChallenge: async (created_user_id, challenged_user_id, message, end_date, risk_point_amount, type, amount) => {
        try {
            await sequelize.sync();
            const challenge = await Challenge.create({
                created_user_id, challenged_user_id, message, end_date, risk_point_amount, type, amount
            })

            const challengedUser = await User.findOne({
                where: { id: challenged_user_id }
            })

            const createdUser = await User.findOne({
                where: { id: created_user_id }
            })

            if (challengedUser.notificationToken) {
                const data = {
                    token: challengedUser.notificationToken,
                    title: "New Challenge",
                    body: `${createdUser.firstName} ${createdUser.lastName} send a new challenge for you`,
                    image: "https://img.freepik.com/free-vector/hand-drawn-congratulations-lettering_23-2149418512.jpg"
                }
                await sendNotification(data)
            }
            return challenge;
        } catch (error) {
            throw error;
        }
    },
    getAllChallenges: async () => {
        try {
            const allChallenges = await Challenge.findAll({
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },],
            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getOneChallenge: async (challenge_id) => {
        try {
            const allChallenges = await Challenge.findOne({
                where: { id: challenge_id },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },],
            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getValidCreatedAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    created_user_id: created_user_id,
                    end_date: {
                        [Op.gte]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getValidAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    created_user_id: created_user_id,
                    end_date: {
                        [Op.gte]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getValidNotAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    created_user_id: created_user_id,
                    end_date: {
                        [Op.gte]: new Date(),
                    },
                    accepted: false,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getPastAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    created_user_id: created_user_id,
                    end_date: {
                        [Op.lt]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getPastNotAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    created_user_id: created_user_id,
                    end_date: {
                        [Op.lt]: new Date(),
                    },
                    accepted: false,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getValidAcceptedReceivedChallengesOfUser: async (challenged_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    challenged_user_id: challenged_user_id,
                    end_date: {
                        [Op.gte]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getValidNotAcceptedReceivedChallengesOfUser: async (challenged_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    challenged_user_id: challenged_user_id,
                    end_date: {
                        [Op.gte]: new Date(),
                    },
                    accepted: false,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    getPastAcceptedReceivedChallengesOfUser: async (challenged_user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    challenged_user_id: challenged_user_id,
                    end_date: {
                        [Op.lt]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    validAcceptedChallengesOfUser: async (user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    [Op.or]: [
                        { challenged_user_id: user_id },
                        { created_user_id: user_id },
                    ],
                    end_date: {
                        [Op.gte]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    pastAcceptedChallengesOfUser: async (user_id) => {
        try {
            const allChallenges = await Challenge.findAll({
                where: {
                    [Op.or]: [
                        { challenged_user_id: user_id },
                        { created_user_id: user_id },
                    ],
                    end_date: {
                        [Op.lt]: new Date(),
                    },
                    accepted: true,
                },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },]

            });
            return allChallenges;
        } catch (error) {
            throw error;
        }
    },
    deleteChallenge: async (challengeID) => {
        try {

            const deletedChallenge = await Challenge.destroy({
                where: {
                    id: challengeID
                }
            })
            return deletedChallenge;
        } catch (error) {
            throw error;
        }
    },
    updateChallenge: async (challenge_id, message, accepted, end_date, risk_point_amount, type, amount) => {
        try {
            const updatedRaws = await Challenge.update(
                { message, accepted, end_date, risk_point_amount, type, amount },
                { where: { id: challenge_id } }
            )
            if (updatedRaws > 0) {
                const updatedChallenge = await Challenge.findByPk(challenge_id);
                return updatedChallenge;
            }

        } catch (error) {
            throw error;
        }
    },
    acceptChallenge: async (challenge_id, userId) => {
        try {
            const challenge = await Challenge.findOne({
                where: { id: challenge_id },
                include: [{
                    model: User,
                    as: 'created_user',
                },
                {
                    model: User,
                    as: 'challenged_user',
                },]
            });

            if (!challenge) {
                return {
                    status: false,
                    message: "can not find challenge"
                }
            }

            if (userId !== challenge.challenged_user_id) {
                return {
                    status: false,
                    message: "you cant accept others challenges"
                }
            }

            if (challenge.accepted) {
                return {
                    status: false,
                    message: "Challenge is already accepted"
                }
            }

            if (!challenge.created_user || !challenge.challenged_user) {
                return {
                    status: false,
                    message: "can not find user"
                }
            }

            if (challenge.created_user.points < challenge.risk_point_amount) {
                return {
                    status: false,
                    message: "Insufficient points of challenger"
                }
            }

            if (challenge.challenged_user.points < challenge.risk_point_amount) {
                return {
                    status: false,
                    message: "Insufficient points"
                }
            }

            const allAcceptedChallengesWithinEndDateByCreatedUser = await Challenge.findAll({
                where: {
                    type: challenge.type,
                    end_date: {
                        [Op.gt]: new Date(),
                    },
                    challenged_user_id: userId,
                    accepted: true

                },
            }
            )

            if (allAcceptedChallengesWithinEndDateByCreatedUser.length > 0) {
                return {
                    status: false,
                    message: "You have already accepted challenge that has same type"
                }
            }

            const allAcceptedChallengesWithinEndDateByAcceptedUser = await Challenge.findAll({
                where: {
                    type: challenge.type,
                    end_date: {
                        [Op.gt]: new Date(),
                    },
                    created_user_id: challenge.created_user_id,
                    accepted: true

                },
            }
            )

            if (allAcceptedChallengesWithinEndDateByAcceptedUser.length > 0) {
                return {
                    status: false,
                    message: "Your challenger has another challenge"
                }
            }


            await User.update(
                { points: challenge.created_user.points - challenge.risk_point_amount },
                { where: { id: challenge.created_user_id } }
            )

            await User.update(
                { points: challenge.challenged_user.points - challenge.risk_point_amount },
                { where: { id: challenge.challenged_user_id } }
            )


            if (challenge.created_user.notificationToken) {
                const data = {
                    token: challenge.created_user.notificationToken,
                    title: `accepted your challenge`,
                    body: `${challenge.challenged_user.firstName} ${challenge.challenged_user.firstName} is accepted your challenge`,
                    image: "https://img.freepik.com/free-vector/hand-drawn-congratulations-lettering_23-2149418512.jpg"
                }
                await sendNotification(data)
            }

            await Challenge.update(
                { accepted: true },
                { where: { id: challenge_id } }
            )

            const newChallenge = await Challenge.findOne({
                where: { id: challenge_id },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],
                },]
            });

            return {
                status: true,
                message: "challenge accept successfully",
                challenge: newChallenge
            }
        } catch (error) {
            throw error;
        }
    },


    calculatingWinner: async (challenge_id, userId) => {
        try {

            const challenge = await Challenge.findOne({
                where: { id: challenge_id },
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', "lastName", "image"],

                },]
            });

            if (!challenge) {
                return {
                    status: false,
                    message: "Challenge not found",
                }
            }

            if (challenge.winner !== null) {
                return {
                    status: true,
                    message: `${challenge.winner == "No Winners" ? "anyone can not win this challenge" : "Winner already exists"}`,
                    challenge
                }
            }


            // TODO: get users current status of challenge from api call
            const createdUserResult = 2000;
            const acceptedUserResult = 3000;

            var newChallenge;
            if (Date.now() > challenge.end_date) {
                await Challenge.update(
                    { winner: "No Winners" },
                    { where: { id: challenge.id } }
                );
                newChallenge = await Challenge.findOne({
                    where: {
                        id: challenge_id
                    }
                })
                return {
                    status: true,
                    message: "No winners for this challenge",
                    challenge: newChallenge
                }
            }

            if (challenge.created_user_id == userId) {
                if (createdUserResult >= challenge.amount) {
                    await Challenge.update(
                        { winner: "Created User" },
                        { where: { id: challenge.id } }
                    );
                    newChallenge = await Challenge.findOne({
                        where: {
                            id: challenge_id
                        },
                        include: [{
                            model: User,
                            as: 'challenged_user',
                            attributes: ['id', 'firstName', "lastName", "image", "notificationToken"],

                        }]
                    })
                    if (newChallenge.challenged_user.notificationToken) {

                        const data = {
                            token: newChallenge.challenged_user.notificationToken,
                            title: "loss the challenge",
                            body: `You loss the challenge`,
                            image: "https://img.freepik.com/free-vector/hand-drawn-congratulations-lettering_23-2149418512.jpg"
                        }
                        await sendNotification(data)
                    }
                    return {
                        status: true,
                        message: "You win this challenge",
                        challenge: newChallenge
                    }
                }
            }

            if (challenge.challenged_user_id == userId) {
                if (acceptedUserResult >= challenge.amount) {
                    await Challenge.update(
                        { winner: "Accepted User" },
                        { where: { id: challenge.id } }
                    )

                    newChallenge = await Challenge.findOne({
                        where: {
                            id: challenge_id
                        },
                        include: [{
                            model: User,
                            as: 'created_user',
                            attributes: ['id', 'firstName', "lastName", "image", "notificationToken"],

                        }]

                    })

                    if (newChallenge.created_user && newChallenge.created_user.notificationToken) {
                        const data = {
                            token: newChallenge.created_user.notificationToken,
                            title: "loss the challenge",
                            body: `You loss the challenge`,
                            image: "https://img.freepik.com/free-vector/hand-drawn-congratulations-lettering_23-2149418512.jpg"
                        }
                        await sendNotification(data)

                    }
                    return {
                        status: true,
                        message: "You win this challenge",
                        challenge: newChallenge
                    }
                }
            }
            newChallenge = await Challenge.findOne({
                where: {
                    id: challenge_id
                }
            })
            return {
                status: true,
                message: "No any winner up to now",
                challenge: newChallenge
            }

        } catch (error) {
            throw error;
        }
    },

    challengeFilter: async (challengerId, receiverId, userId, accepted, valid) => {
        try {
            const whereClause = {};

            if (accepted !== undefined) {
                whereClause.accepted = accepted;
            }
            if (valid !== undefined) {
                if (valid == true) {
                    whereClause.end_date = {
                        [Op.gte]: new Date(),
                    };
                } else {
                    whereClause.end_date = {
                        [Op.lt]: new Date(),
                    };
                }
            }
            if (challengerId != undefined && receiverId != undefined) {
                whereClause.created_user_id = challengerId;
                whereClause.challenged_user_id = receiverId;

            } else if (challengerId != undefined) {
                whereClause.created_user_id = challengerId;
            }
            else if (receiverId != undefined) {
                whereClause.challenged_user_id = receiverId;
            } else if (userId !=undefined) {
                
                whereClause[Op.or] = [
                    { challenged_user_id: userId },
                    { created_user_id: userId },
                ];
            }
            const result = await Challenge.findAll({
                where: whereClause,
                include: [{
                    model: User,
                    as: 'created_user',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
                {
                    model: User,
                    as: 'challenged_user',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                }],
            });
            return result;

        } catch (error) {
            throw error;
        }
    },
}

export default challengeRepo;