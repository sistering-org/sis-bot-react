module.exports = {
    questions : [
        {
            id: 200,
            message : `Thank you for expressing your interest! would you like to know about
            our voluteering opportunities?`,
            options : [
                { value: 1, label: 'yes', trigger: 201},
                { value: 2, label: 'no',  trigger: 202},                
            ]
        },
        {
            id: 201,
            message : `Here are our volunteering opportunities:`,
            options : [
                { value: 1, label: 'Program Volunteer', trigger: 203},
                { value: 2, label: 'Occasional Volunteering',  trigger: 204},      
                { value: 3, label: 'Kitchen Support',  trigger: 205},              
            ]
        },

        //----
        // VOLUNTEERING OPPORTUNITY INFO
        //---
        {
            id: 203,
            message : `use their hobbies and specialized skills to 
            run groups or workshops such as ESL classes,
             aromatherapy, massage, yoga, facials/manicures, beading, crafts, etc.
             We have these dates available, If you'd like to volunteer 
             please choose an available date`,
            
             options : [

                { value: 1, label: 'November 12h 7pm', trigger: 206},
                { value: 2, label: 'November 22th 8pm', trigger: 206},      
                { value: 3, label: 'November 30th 8pm', trigger: 206},
                { value: 4, label: 'Choose another opportunity', trigger: 201},
             ]

        },

        {
            id: 204,
            message : `Occasional volunteers help with special events, outings, 
            and seasonal projects`,
            options : [
                
                    { value: 1, label: 'November 12h 7pm', trigger: 206},
                    { value: 2, label: 'November 22th 8pm', trigger: 206},      
                    { value: 3, label: 'November 30th 8pm', trigger: 206},
                    { value: 4, label: 'Choose another opportunity', trigger: 201},
                ]
            

        },
        {
            id: 205,
            message : `Kitchen volunteers help prep and serve meals to participants`,
            options : [                
                    { value: 1, label: 'November 12h 7pm', trigger: 206},
                    { value: 2, label: 'November 22th 8pm', trigger: 206},      
                    { value: 3, label: 'November 30th 8pm', trigger: 206},
                    { value: 4, label: 'Choose another opportunity', trigger: 201},
                ] 
        },

        //----
        // SCHEDULING
        //---
        {
            id: 206,
            message : `Please Enter your email`,
            user : true,
            validations : (email) => {
                let email_regex =  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                
                if (email_regex.match(email)){
                    return true;
                } else {
                    return false;
                }      
            },
            trigger: 207
        },

        //----
        // Orientation
        //---
        
        {
            id: 207,
            message : `Thank you for volunteering, we've sent an email with your schedule.
            If you're a new volunteer, please click this link to familiarize yourself
            with our facilities`,          
           
        }
    ]    
}