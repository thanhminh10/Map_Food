export type Location = {
    id: Number,
    name: String,
    rating: Number,
    categories: [],
    priceRating: Number,
    photo: String,
    isSelected: boolean,
    duration: String,
    location: [],
    menu: [
        {
            menuId: Number,
            name: String,
            photo: String,
            description: String,
            calories: Number,
            price: Number
        }
    ]
};