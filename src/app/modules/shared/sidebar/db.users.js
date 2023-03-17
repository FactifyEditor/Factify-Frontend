db.users.findAndModify(
   {
     query: { _id: ObjectId("63ec74718e10455946e79f56") },
     update: { password:"$2b$10$WCHFH7gWCE4919ykNb9JB.xGMSfR9QytihoO7fMVzRPKTtqXG/lga","firstName" : "Ravi", "lastName" : "Rawat", "phone" : "7678619144", "email" : "rawatravi2012@gmail.com", "status" : 0, "roles" : [ ObjectId("63ec743c8e10455946e79f4f") ], "created" : ISODate("2023-02-15T05:58:09.757Z"), "__v" : 0 },
     upsert: true
   }
)

