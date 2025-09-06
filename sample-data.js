// Sample data for testing
// Run this in MongoDB to insert sample contacts

db.contacts.insertMany([
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    favoriteColor: "Blue",
    birthday: new Date("1990-05-15")
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@email.com",
    favoriteColor: "Red",
    birthday: new Date("1985-08-22")
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@email.com",
    favoriteColor: "Green",
    birthday: new Date("1992-12-10")
  }
]);
