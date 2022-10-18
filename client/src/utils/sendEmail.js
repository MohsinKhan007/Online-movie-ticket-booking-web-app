// // import emailjs from 'emailjs-com';
// // import { SMTPClient } from 'emailjs';

// const sendEmail = async (setShowModal) => {
//   try {

//     const client=new SMTPClient({
//       user:'user',
//       password:'password',
//       host:'stmp.your-email.com',
//       ssl:true
//     });

//     client.send(
//       {
//         text:'I hope this works',
//         from:'you <username@youremail.com',
//         to:'you <username@youremail.com',
//         cc:'else <else@youremail.com>',
//         subjects:'testing emailjs',
//       },
//       (err,message)=>{
//         console.log(err||message);
//       }
//     )


//     // await emailjs.send(
//     //   'service_1yybzln',
//     //   'template_a8l6sr4',
//     //   {
//     //     to_name: 'manu'
//     //   },
//     //   'user_unZVLPqrU43eqBVNf5Hp4'
//     // );
//   } catch (err) {
//     setShowModal({
//       status: true,
//       type: 'close',
//       subject: 'error',
//       message: 'something_wrong'
//     });
//   }
// };

// export default sendEmail;
