
bytesToBase64 = (bytes) => {
    return btoa(
      new Uint8Array(bytes).reduce(
        (datos, byte) => datos + String.fromCharCode(byte),
        ""
      )
    );
  };

export default bytesToBase64;
