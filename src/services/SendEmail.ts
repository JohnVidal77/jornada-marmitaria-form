import Api from './Api';
import CleanNumber from './CleanNumber';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const sendEmail = async (emailDate): Promise<void> => {
  const {
    name,
    level,
    phone,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  } = emailDate;

  await Api.post(
    SENDGRID_API,
    {
      personalizations: [
        {
          to: [
            {
              email: process.env.TRELLO_EMAIL,
            },
          ],
          subject: `${name} - ${phone} - NIVEL ${level}`,
          dynamic_template_data: {
            subject: `${name} - ${phone} - NIVEL ${level}`,
            phone,
            cleanPhone: CleanNumber(phone),
            name,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
          },
        },
      ],
      template_id: process.env.SENDGRID_TEMPLATE_ID,
      from: {
        email: 'noreply@octamais.com',
        name: 'Club das Marmiteiras',
      },
      content: [
        {
          type: 'text/html',
          value: 'Not Working',
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
    },
  );
};

export default sendEmail;
