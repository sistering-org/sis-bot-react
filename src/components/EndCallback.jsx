import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const getAttrs = (iframeTag) => {
  var doc = document.createElement('div');
  doc.innerHTML = iframeTag;

  const iframe = doc.getElementsByTagName('iframe')[0];
  return [].slice
    .call(iframe.attributes)
    .reduce((attrs, element) => {
      attrs[element.name] = element.value;
      return attrs;
    }, {});
}

class EndCallback extends React.Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  // iframe () {
  //   return {
  //     __html: this.props.iframe
  //   }
  // }

  handleEnd({ steps, values }) {
   
  }

  render() {
    return (
       <div className="docs-example-1">
        <ChatBot
            handleEnd={this.handleEnd}
            steps={[
          {
            id: "1",
            message: 'Hi there',
            trigger: "dedicatedVolunteers",
          },
          {
            id: "dedicatedVolunteers",
            message: 'Without our dedicated team of volunteers, we wouldn’t be able to offer the programs and activities participants have come to count on.',
            trigger: "noHesitate",
          },
          {
            id: "noHesitate",
            message: 'So don\'t hesitate to learn more about our opportunities',
            trigger: "noHesitateOptions",
          },
          {
            id: "noHesitateOptions",
            options: [
              { value: 1, label: 'Who you\'re helping', trigger: "womenDesc1" },
              { value: 2, label: 'Becoming a volunteer', trigger: "becomeVolunteerDesc" }
            ],
          },
          //----
          // women
          //----
          {
            id: "womenDesc1",
            message: 'Sistering is a trans-inclusive agency supporting women from across Toronto who experience first hand the impact of marginalization and poverty.',
            trigger: "womenDesc2",
          },
          {
            id: "womenDesc2",
            message: 'They may be homeless, or are at risk of becoming homeless.',
            trigger: "womenDesc3",
          },
          {
            id: "womenDesc3",
            message: 'They are a diverse group, from 16 to 80-plus years old:',
            trigger: "womenDesc4",
          },
          {
            id: "womenDesc4",
            message: 'women with substance use or mental health issues; sex workers; women who have interactions with the criminal justice system;',
            trigger: "womenDesc5",
          },
          {
            id: "womenDesc5",
            message: 'women who have experienced, or are experiencing, trauma and violence;',
            trigger: "womenDesc6",
          },
          {
            id: "womenDesc6",
            message: 'immigrant and refugee women;',
            trigger: "womenDesc7",
          },
          {
            id: "womenDesc7",
            message: 'women with health issues and disabilities;',
            trigger: "womenDesc8",
          },
          {
            id: "womenDesc8",
            message: 'and women without legal status.',
            trigger: "womenNavOptions",
          },
          {
            id: "womenNavOptions",
            options: [
              { value: 1, label: 'Go back', trigger: "womenDesc1" },
              { value: 2, label: 'Watch an experience', trigger: "womenVideo" },
              { value: 3, label: 'Read a user story', trigger: "womenStoryOptions" },
              { value: 4, label: 'How do I sign up?', trigger: "signUp" }
            ],
          },
          {
            id: "womenStoryOptions",
            options: [
              { value: 1, label: 'D\'s Story', trigger: "d1" },
              { value: 2, label: 'Crystal\'s Story', trigger: "crystal1" },
              { value: 3, label: 'Raha\'s Story', trigger: "raha1" }
            ],
          },
          // question 2
          {
            id: "becomeVolunteerDesc",
            message: 'Here are our volunteering opportunities. Click on one to find out more.',
            trigger: "volunteerTypes",
          },
          {
            id: "volunteerTypes",
            options: [
              { value: 1, label: 'Program Volunteers', trigger: "programDesc" },
              { value: 2, label: 'Sisters Kitchen Volunteers', trigger: "kitchenDesc1" },
            ],
          },
          //----
          // Program Volunteer
          //---
          {
            id: "programDesc",
            message: 'Program volunteers use their hobbies and specialized skills to run groups or workshops such as ESL classes, aromatherapy, massage, yoga, facials/manicures, beading and crafts.',
            trigger: "programVolunteerOptions",
          },
          {
            id: "programVolunteerOptions",
            options: [
              { value: 1, label: 'How does it work?', trigger: "programHow1" },
              { value: 2, "programSkills1": 'What skills are needed?', trigger: 6 },
              { value: 3, label: 'Time commitment?', trigger: "programTimeCommitment" },
              { value: 4, label: 'How do I sign up?', trigger: "signUp" }
            ],
          },
          {
            id: "programNavOptions",
            options: [
              { value: 1, label: 'Go back', trigger: "noHesitateOptions" },
              { value: 3, label: 'Watch an experience', trigger: "womenVideo" },
              { value: 3, label: 'Read a user story', trigger: "souzan1" },
              { value: 4, label: 'How do I sign up?', trigger: "signUp" }
            ],
          },
          {
            id: "programHow1",
            message: 'Volunteers work with the Volunteer Coordinator and staff to develop and run activities, groups and workshops.',
            trigger: "programHow2",
          },
          {
            id: "programHow2",
            message: 'A staff member or another volunteer may be available for additional support.',
            trigger: "programNavOptions",
          },
          {
            id: "programSkills1",
            message: 'Experience, training and expertise in the program area agreed upon',
            trigger: 'programSkills2',
          },
          {
            id: "programSkills2",
            message: 'Understanding of the issues facing women experiencing homelessness, poverty and social isolation',
            trigger: 'programSkills3',
          },
          {
            id: "programSkills3",
            message: 'Understanding of clear and appropriate professional boundaries as outlined by the Volunteer Coordinator, Sistering staff and Sistering policies',
            trigger: 'programNavOptions',
          },
          {
            id: "programTimeCommitment",
            message: 'A two-to-four hour shift, one day a week or every two weeks.',
            trigger: 'programNavOptions',
          },
          //----
          // Embed video iframe
          //---
          {
            id: 6,
            component: (
              <div>
              <iframe {...getAttrs(this.props.iframe) } />
          </div> 
              
            ),
            trigger: 'signUp'
          },
          //----
          // Kitchen Support
          //---
          {
            id: "kitchenVolunteerOptions",
            options: [
              { value: 1, label: 'How does it work?', trigger: "kitchenHow1" },
              { value: 2, "kitchenSkills1": 'What skills are needed?', trigger: 6 },
              { value: 3, label: 'Time commitment?', trigger: "kitchenTimeCommitment" },
              { value: 4, label: 'How do I sign up?', trigger: "signUp" }
            ],
          },
          {
            id: "kitchenNavOptions",
            options: [
              { value: 1, label: 'Go back', trigger: "kitchenVolunteerOptions" },
              { value: 3, label: 'Watch an experience', trigger: "kitchenVideo" },
              { value: 3, label: 'Read a user story', trigger: "sara1" },
              { value: 4, label: 'How do I sign up?', trigger: "signUp" }
            ],
          },
          {
            id: "kitchenDesc1",
            message: 'The 24/7 Drop In offers three hot meals a day plus snacks, and soup and sandwiches overnight—often the only fresh and nutritious meals Sistering participants will enjoy.',
            trigger: "kitchenDesc2",
          },
          {
            id: "kitchenDesc2",
            message: 'And we couldn’t prepare and serve the women who come to Sisters Kitchen each day without the help of dedicated volunteers.',
            trigger: "kitchenNavOptions",
          },
          {
            id: "kitchenHow1",
            message: 'Volunteers have the opportunity to engage in a variety of activities—all vital—including food prep, sorting food donations, assisting with inventory, serving meals and helping with clean up.',
            trigger: "kitchenNavOptions",
          },
          {
            id: "kitchenSkills1",
            message: 'Comfort in a kitchen environment',
            trigger: 'kitchenSkills2',
          },
          {
            id: "kitchenSkills2",
            message: 'Ability to work alongside, and take direction from, staff and the primary cook',
            trigger: 'kitchenSkills3',
          },
          {
            id: "kitchenSkills3",
            message: 'Ability to stand during the three-hour shift',
            trigger: 'kitchenNavOptions',
          },
          {
            id: "kitchenTimeCommitment",
            message: 'One day a week or weekend from 9:30 am to 1:00 pm but there is some flexibility depending on your availablity and personal schedule.',
            trigger: 'kitchenNavOptions',
          },
          {
            id: 'email',
            user: true,
            validator: (value) => {
              let email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

              if (!value.match(email_regex)) {
                return 'not a valid email';
              }
              return true;
            },
            trigger: 'bye'
          },
          {
            id: 'bye',
            message: 'See ya later!',
            end : true,
          },
          //----
          // signUp
          //---
          {
            id: 'signUp',
            message: 'All weekly volunteers attend orientation and screening activities, which include:\n• An interview\n• An orientation session\n• Ongoing and on-the-job training and support\n• Diversity training and other volunteer workshops',
            trigger: 'clickHere'
          },
          {
            id: 'clickHere',
            message: 'We would love for you to join our team of sisters. Click here to apply now!',
            end : true
          },
          //----
          // Sara's story
          //---
          {
            id: 'sara1',
            message: 'Sara Peters has been volunteering at Sistering for two years, first in the Kitchen and now as a member of the Medical Reception team',
            trigger: 'sara2'            
          },
          {
            id: 'sara2',
            message: 'When she moved to Toronto, Sara knew she wanted to volunteer at an agency supporting women, and when she discovered Sistering, she knew that here is where she wanted to be.',
            trigger: 'sara3'            
          },
          {
            id: 'sara3',
            message: 'What impresses her: how ferociously the team lives Sistering’s low barrier philosophy, accepting women as they come, with compassion, wisdom and a genuine desire to help.',
            trigger: 'sara4'            
          },
          {
            id: 'sara4',
            message: 'As Medical Receptionist, Sara comes face to face with women in pain. ',
            trigger: 'sara5'            
          },
          {
            id: 'sara5',
            message: 'During one of her first shifts, a woman needed to see the doctor, she told Sara, because she had been sexually assaulted.',
            trigger: 'sara6'            
          },
          {
            id: 'sara6',
            message: 'Sara had never been so close to so much suffering.',
            trigger: 'sara7'            
          },
          {
            id: 'sara7',
            message: 'But while her job involves triage – participants, doctors and the health care system – she understands that sometimes, her real impact is simply listening – really listening – and making the women who come to her feel truly cared for.',
            trigger: ''            
          },
          //----
          // Souzan's story
          //---
          {
            id: 'souzan1',
            message: 'Souzan volunteers for the Beading Program; she used to make jewelry in high school and welcomed the opportunity to reignite her creative spirit. ',
            trigger: 'souzan2'            
          },
          {
            id: 'souzan2',
            message: 'When she learned that we wanted to offer Beading in the Drop In in the evening, she stepped up.',
            trigger: 'souzan3'            
          },
          {
            id: 'souzan3',
            message: 'Souzan meets every other week with between 10 and 20 women, connecting with them as they make beautiful pieces, often as gifts for friends.',
            trigger: 'souzan4'            
          },
          {
            id: 'souzan4',
            message: 'The Beading Program brings women together, physically and emotionally, and it’s that sense of community Souzan cherishes.',
            trigger: 'souzan5'            
          },
          {
            id: 'souzan5',
            message: 'Belonging is the word that comes to mind.',
            trigger: 'programNavOptions'            
          },
          //----
          // Crystal's story
          //---
          {
            id: 'crystal1',
            message: 'Crystal is an active participant with mental health and addiction issues, who has been accessing Employment and Income Support for three years.',
            trigger: 'crystal2'            
          },
          {
            id: 'crystal2',
            message: 'Initially, she identified facial tattoos as a barrier to traditional employment.',
            trigger: 'crystal3'            
          },
          {
            id: 'crystal3',
            message: 'She receives on-going employment and supportive counselling, and this year started volunteering in Sistering’s kitchen, washing dishes and prepping food. ',
            trigger: 'crystal5'            
          },
          {
            id: 'crystal5',
            message: 'She is exploring working as a Peer, and has completed the Wellness Recovery and Action Plan (WRAP), to become a Peer Facilitator.',
            trigger: 'crystal5'            
          },
          {
            id: 'crystal6',
            message: 'Crystal had a housing crisis, and received new housing, thanks to our Community Support Team.',
            trigger: 'womenStoryOptions'            
          },
          //----
          //D's story
          //---
          {
            id: 'd1',
            message: 'D. is 36 years old, the mother of two girls aged 18 and 19. They live with their dad. She Facebooks them.',
            trigger: 'd2'            
          },
          {
            id: 'd2',
            message: 'D. left home at 14, bouncing from her 16-year- old boyfriend’s place to a shelter to family and back again.',
            trigger: 'd3'            
          },
          {
            id: 'd3',
            message: 'She worked furiously to create a safe home for her young family – her girls were always her priority – but despite her strength and courage the girls’ father eventually gained custody. ',
            trigger: 'd4'            
          },
          {
            id: 'd4',
            message: 'D. spent a decade using substances. She worked as an exotic dancer. She came into conflict with the law.',
            trigger: 'd5'            
          },
          {
            id: 'd5',
            message: 'A chance encounter with a woman who came to Sistering led her to the Drop In.',
            trigger: 'd6'            
          },
          {
            id: 'd6',
            message: 'Fast forward: today D. is a Peer Harm Reduction Worker.',
            trigger: 'd7'            
          },
          {
            id: 'd7',
            message: 'She is a vocal advocate for homeless and marginalized women, fighting for their right to be safe and warm and treated with the dignity.',
            trigger: 'd8'            
          },
          {
            id: 'd8',
            message: 'Sistering gave D. strength.She learned that she deserved to be treated with respect.',
            trigger: 'womenStoryOptions'            
          },
          //----
          // Raha's story
          //---
          {
            id: 'raha1',
            message: 'Volunteering at Sistering is an experience - eye-opening, upsetting, uplifting and empowering all at the same time.',
            trigger: 'raha2'            
          },
          {
            id: 'raha2',
            message: 'I serve breakfast at Sistering two or three times a month. I arrive around 9am and see women hanging out outside the Drop In door.',
            trigger: 'raha3'            
          },
          {
            id: 'raha3',
            message: 'I wonder where they spent the night. At Sistering? On the street? In a park?',
            trigger: 'raha4'            
          },
          {
            id: 'raha4',
            message: 'I go inside, and lock my personal belongings in the office before walking through the Drop In, which is now set up for breakfast.',
            trigger: 'raha5'            
          },
          {
            id: 'raha5',
            message: 'I see women waiting for breakfast to start. Some are napping at the tables; others are applying makeup or filling out various forms. Most people are cranky in the morning and these women have endured a night I can’t imagine.',
            trigger: 'raha6'            
          },
          {
            id: 'raha6',
            message: 'I go to the kitchen and set up the breakfast serving area...bowls of cereal, glasses of milk, often boiled eggs or leftovers from dinner the night before, yogurt and bread.',
            trigger: 'raha7'            
          },
          {
            id: 'raha7',
            message: 'I\'ve started to recognize many of them, and my goal is to learn their names. That\'s the sad part: realizing how many names there are to learn.',
            trigger: 'raha8'            
          },
          {
            id: 'raha8',
            message: 'I am grateful to Sistering for all that they do for women in this city, and I hope from the bottom of my heart that they\'ll one day close due to "lack of business".',
            trigger: 'womenStoryOptions'            
          },

          //TODO
          {
            id: 'programVideo',
            message: 'business".',
            trigger: 'bye'            
          },
          {
            id: 'kitchenVideo',
            message: 'business".',
            trigger: 'bye'            
          },
          {
            id: 'womenVideo',
            message: 'business".',
            trigger: 'bye'            
          },
  
        ]}
        />
      </div>
    );
  }
}



export default EndCallback;