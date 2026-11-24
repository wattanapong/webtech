const turnConfig = {
    iceServers: [
      { urls: ["stun:127.0.0.1"] },
      {
        username:
          "Wj3dtFyTovJl_655q7_9Y-Uy_DTma3qU6uTZmdAqUvb0TiOcYH295GlvO4exr4KnAAAAAGGYE3dlbmVhc2xhcmk=",
        credential: "8a1494e0-497d-11ec-9fcf-0242ac120004",
        urls: [
          "turn:127.0.0.1:80?transport=udp",
          "turn:127.0.0.1:3478?transport=udp",
          "turn:127.0.0.1:80?transport=tcp",
          "turn:127.0.0.1:3478?transport=tcp",
          "turns:127.0.0.1:443?transport=tcp",
          "turns:127.0.0.1:5349?transport=tcp",
        ],
      },
    ],
  };