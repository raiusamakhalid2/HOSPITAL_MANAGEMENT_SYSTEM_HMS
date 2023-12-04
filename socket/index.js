            const io = require("socket.io")(5000, {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"]
                },
            });
            // <-----------------Functions Start---------------------------->

            let Users = []; 

            // when new users are connected
            const addUser = (userId, socketId) => {
                if (!Users.some(item => item.userId === userId)) {
                    Users.push({ userId, socketId });
                }
            };

            // when user discinnected
            const removeUser = (socketId) => {
                Users = Users.filter(user => user.socketId !== socketId);
            };

            // getuser to which we send message
            const getUser = (userId) => {
                return Users.find((user) => user.userId === userId);
            };
            // <-----------------Functions Ended---------------------------->


            // when new users are connected
            io.on("connection", (socket) => {
                console.log(`Socket is listening on Port ws://localhost:`);

                // take userId and socketId from user
                socket.on("addUser", (userId) => {
                    addUser(userId, socket.id);
                    io.emit("getUsers", Users);
                })
                
                
                // send and get messages
                socket.on("sendMessage", ({ senderId, receiverId, text }) => {
                    const user = getUser(receiverId);       
                    if (user) {
                        io.to(user.socketId).emit("getMessage", {
                            senderId,
                            text,
                        });
                    } else {
                        console.log(`User Offline`);
                    }
                });

                // socket.emit("me", socket.id);   

                // Broadcast callEnded event when a user disconnects
                socket.on("disconnect", () => {
                    socket.broadcast.emit("callEnded");
                  });

                //   socket.on("callUser", (data) => {
                //     io.to(data.userToCall).emit("callUser", {
                //             signal: data.signalData,
                //             from: data.from,
                //             name: data.name,
                //           });
                //         })

                // Handle incoming call
                socket.on("callUser", (data) => {
                  console.log(`Incoming call from ${data.from}`);
                  const user = getUser(data.userToCall);
                  console.log(`Calling to ${user?.socketId}`);
                  if (user) {
                  io.to(user.socketId).emit("callUser", {
                    signal: data.signalData,
                    from: data.from,
                    name: data.name,
                  });
                } else {
                    console.log(`User Offline`);
                    }
                });
              
                // Handle answering call
                socket.on("answerCall", (data) => {
                  console.log(`Answering call from ${data.from}`);
                  const user = getUser(data.to);
                  io.to(user.socketId).emit("callAccepted", data.signal);
                });

                // when user disconnected
                socket.on("disconnect", () => {
                    console.log("socket disconnected");
                    removeUser(socket.id);
                    io.emit("getUsers", Users);
                })
            })

            // io.on("connection", (socket) => {
            //     console.log(`Socket is listening on Port ws://localhost:`);

            //     socket.emit("me", socket.id)
            
            //     socket.on("disconnect", () => {
            //         socket.broadcast.emit("callEnded")
            //     })
            
            //     socket.on("callUser", (data) => {
            //         io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
            //     })
            
            //     socket.on("answerCall", (data) => {
            //         io.to(data.to).emit("callAccepted", data.signal)
            //     })
            // })
            