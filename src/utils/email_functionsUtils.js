import CustomError from "../../middlewares/userHandler_middleware.js";
import { sendEmail } from "./emailUtils.js";

export const sendAccountRegisteredEmail = async (user) => {
  try {
    const subject = "Welcome to E-Commerce!";
    const html = `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); padding:20px;">
          <h2 style="color:#333;">Hello ${user.first_name} ${user.last_name},</h2>
          <p style="font-size:16px; color:#555;">
            Welcome to <strong>E-Commerce</strong> 🎊.  
            Your account has been successfully registered with the email <b>${user.email}</b>.
          </p>
          <p style="font-size:16px; color:#555;">
            You can now log in and explore our platform for the best shopping experience.
          </p>
          <div style="text-align:center; margin:30px 0;">
            <a href="${process.env.CLIENT_URL}/login" 
              style="display:inline-block; padding:12px 20px; background:#4CAF50; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
              Login to Your Account
            </a>
          </div>
          <p style="font-size:14px; color:#777;">
            If you did not register for this account, please ignore this email.
          </p>
          <p style="margin-top:30px; font-size:14px; color:#aaa;">— The E-Commerce Team</p>
        </div>
      </div>
    `;

    return await sendEmail({
      to: user.email,
      subject,
      html,
    });
  } catch (error) {
    throw new CustomError("Failed to send account registered email", 500);
  }
};

// password changed
export const passwordChangedEmail = async (user) => {
  try {
    const subject = "🔑 Your Password Has Been Changed!";
    const html = `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); padding:20px;">
          <h2 style="color:#333;">Hi ${user.first_name} ${user.last_name},</h2>
          <p style="font-size:16px; color:#555;">
            We wanted to let you know that your password has been successfully changed for your <strong>E-Commerce</strong> account.
          </p>
          <p style="font-size:16px; color:#555;">
            If you did not initiate this change, please reset your password immediately by clicking the button below.
          </p>
          <div style="text-align:center; margin:30px 0;">
            <a href="${process.env.CLIENT_URL}/reset-password" 
              style="display:inline-block; padding:12px 20px; background:#FF5733; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
              Reset Password
            </a>
          </div>
          <p style="font-size:14px; color:#777;">
            If you did make this change, no further action is required.
          </p>
          <p style="margin-top:30px; font-size:14px; color:#aaa;">— The E-Commerce Team</p>
        </div>
      </div>
    `;
    return await sendEmail({
      to: user.email,
      subject,
      html,
    });
  } catch (error) {
    throw new CustomError("Failed to send password changed email", 500);
  }
};

// order placed
