import nodemailer from "nodemailer";
import { User } from "@/backend/db/models/users";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const token = bcryptjs.hashSync(userId.toString(), 10);
    const user = await User.findOne({ _id: userId });
    if (emailType === "VERIFY") {
      user.verifyToken = token;
      user.verifyTokenExpiry = Date.now() + 3600000;
    } else if (emailType === "RESET") {
      (user.forgottenPasswordToken = token),
        (user.forgottenPasswordTokenExpiry = Date.now() + 3600000);
    }
    await user.save();

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "752239ca5f359d",
        pass: "241e2f86425e8d",
      },
    });

    const mailRes = await transporter.sendMail({
      from: "sahilanime06@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: `<p>Click <a href=${process.env.DOMAIN}/verify?token=${token}>here</> to verify.</p>`, // html body
    });
    return mailRes;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
