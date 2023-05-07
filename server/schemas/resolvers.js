const { AuthenticationError } = require('apollo-server-express');
const { User, Spirit, Cocktails } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find();
        },
        user: async (parent, { email }) => {
          return User.findOne({ email });
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('barStock');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        barstock: async (parent, args, context) => {
        const user = await User.findOne({ _id: context.user._id }).populate('barStock');
        const barStock = user.barStock;
        return barStock;
        },
        faves: async (parent, args, context) => {
            const { _id } = context.user
            const user = await User.findById(_id).populate('favourites');
            const favourites = user.favourites;
            return favourites;
        },
        allspirits: async () => {
            return Spirit.find();
        },
        allcocktails: async () => {
            return Cocktails.find();
        },
        possiblecocktails: async (parent, args, context) => {
            const user = await User.findOne({ _id: context.user._id }).populate('barStock');
            const userIngredientsSet = new Set(
              user.barStock.flatMap((spirit) => spirit.spiritType)
            );
            const userIngredients = Array.from(userIngredientsSet);
          
            const cocktails = await Cocktails.find({ ingredients: { $in: userIngredients } });
          
            const filteredCocktails = cocktails.filter((cocktail) =>
              cocktail.ingredients.every((ingredient) => userIngredients.includes(ingredient))
            );
          
            return filteredCocktails;
          },
      },
    
      Mutation: {
        addUser: async (parent, { firstname, email, password }) => {
          const user = await User.create({ firstname, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        addSpirit: async (parent, { name, spiritType}, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to add a spirit.');
              }
            const spirit = await Spirit.create({ 
            name, 
            spiritType,
            });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { barStock: spirit._id } }
              );

            return spirit;
          },
          addExisting: async (parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to add a spirit.');
              }
              const spirit = await Spirit.findById(_id);

              if (!spirit) {
                throw new Error('Spirit not found.');
              }
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { barStock: spirit._id } },
                { new: true }
              );

            return spirit;
          },
          removeSpirit: async (parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to add a spirit.');
              }
              const spirit = await Spirit.findById(_id);

              if (!spirit) {
                throw new Error('Spirit not found.');
              }
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { barStock: spirit._id } },
              );

            return spirit;
          },
          addCocktail: async (parent, { cocktail, description, recipe, ingredients, imgLink }) => {

              const newCocktail = await Cocktails.create({
                cocktail,
                description,
                recipe,
                ingredients,
                imgLink,
              });
      
              return newCocktail;
          },
        },
}
module.exports = resolvers;
