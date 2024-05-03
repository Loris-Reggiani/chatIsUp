const sgMail = require('@sendgrid/mail');

// Configure the API key
sgMail.setApiKey("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");

const sendEmail = async ({ to, from, subject, text, html, templateId, dynamicTemplateData }) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
    templateId,
    dynamicTemplateData
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = { sendEmail };
