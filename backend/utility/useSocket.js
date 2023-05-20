const { isAuth, isAuthSocket, createOrGetDocument, isValide, getUserCreatedDocument } = require("./util");
const Document = require("../model/Document");
const useSocket=(io)=>{
io.on("connection", (socket) => {
    socket.on("get-documents", async ({ documentId, user, participant }) => {
     
      if (user == null || user?.email == null || participant == null)
        return socket.emit("load-documents", {
          error: "Invalide User Id user null",
        });
  
      const userCreated = await getUserCreatedDocument(documentId);
  
      if (documentId === null || documentId === undefined)
        return socket.emit("load-documents", {
          error: `Invalide Document Id nulllll ${documentId}`,
        });
  
      if (
        (userCreated !== null &&
          user?.email !== participant &&
          user.email !== userCreated?.userId) ||
        (user?.email === participant && user.email !== userCreated?.guestId)
      ) {
        console.log(userCreated, " creaate ", user);
  
        return socket.emit("load-documents", {
          error: `Invalide Document Id userrrr ${documentId}`,
        });
      }
  
      const document = await createOrGetDocument(
        documentId,
        user.email,
        participant
      );
  
      if (!isValide(document))
        return socket.emit("load-documents", {
          error: `Invalide Document Id ddddddddd ${documentId}`,
        });
  
      socket.join(documentId);
      console.log(document.data, "ddd");
      socket.emit("load-documents", { document: document.data });
      
  
      socket.on("save-documents", async (document) => {
        await Document.findByIdAndUpdate(documentId, { data: document });
      });
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });
    });
  
    console.log("connected");
  });
}

module.exports={useSocket}