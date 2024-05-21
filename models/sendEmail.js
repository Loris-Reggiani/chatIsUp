const sgMail = require("@sendgrid/mail");
const { config } = require("dotenv");
config();
// Configure the API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({
  to,
  from,
  subject,
  text,
  html,
  templateId,
  dynamicTemplateData,
}) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
    templateId,
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = { sendEmail };
