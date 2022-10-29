const { User } = require("../../models/users");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", filename);

    Jimp.read(avatarUrl, (error, filename) => {
      if (error) throw error;
      filename.resize(250, 250).write(avatarUrl);
    });

    await User.findByIdAndUpdate(_id, { avatarUrl });
    res.json({
      message: "Avatar updated",
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
