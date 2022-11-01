const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<tr align="center">
    <h2>You're on your way!<br>Let's confirm your email address.</h2>
</tr><br><td align="center"><button type="button" style="background: #e05333; cursor: pointer; "><a target="_blank" style="color:#ffffff; font-family:Arial,sans-serif; font-size:20px; line-height:24px; text-align:center; font-weight:bold; text-decoration:none;" href="${BASE_URL}/api/users/verify/${verificationToken}">CONFIRM</a></button></td>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
