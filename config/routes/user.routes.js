const _ = require("lodash");
const routeUtils = require("./utils.route.js");
const User = require("../../models/user.js");

module.exports = [
  // Read the current 'self' user and return its user details, including roles
  {
    method: "GET",
    path: "/users/self",
    config: {
      description: "Read a user",
      tags: ["Users"],
    },
    handler: async (request, h) => {
      try {
        const { user } = request.auth.credentials;
        const res = await user.findComplete();
        return routeUtils.replyWith.found(res, h);
      } catch (err) {
        return routeUtils.handleErr(err, h);
      }
    },
  },

  // Read a specific user and return its user details, including roles.
  {
    method: "GET",
    path: "/users/{userId}",
    config: {
      description: "Read a specific user",
      tags: ["Users"],
    },
    handler: async (request, h) => {
		try {
		  const { user } = request.auth.credentials;
		  const res = await User.findSpecific({
			  user,
			  userId: request.params.userId,
			});
			return routeUtils.replyWith.found(res, h);
		} catch (err) {
        return routeUtils.handleErr(err, h);
      }
    },
  },
];
