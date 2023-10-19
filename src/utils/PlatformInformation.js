const platformInformation = [
{   pk: 3,
    name: "twitter",
    file_types:[{
        pk: 1,
        name:"mp4"
    },
    {
        pk: 2,
        name:"jpg"
    },
    {
        pk: 3,
        name:"png"
    }
    ],
    //kb
    max_size_video: 512000,
    min_size_video: 0,

    //seconds
    min_length_video: 0,
    max_length_video: 0,

    //kb
    max_size_img: 5000,
    min_size_img: 0,

    //char
    max_text: 256,
    min_text: 0,

},

{   pk: 2,
    name: "tiktok",
    file_types:[{
        pk: 1,
        name:"mp4"
    },
    {
        pk: 2,
        name:"jpg"
    },
    {
        pk: 3,
        name:"png"
    }
    ],
    //kb
    max_size_video: 72000,
    min_size_video: 15,

    //seconds
    min_length_video: 3,
    max_length_video: 600,

    //kb
    max_size_img: 300000,
    min_size_img: 0,

    //char
    max_text: 0,
    min_text: 2200,

},
{pk: 6,
    name: "youtube",
    file_types:[{
        pk: 1,
        name:"mp4"
    }
    ],
    //kb
    max_size_video: 72000,
    min_size_video: 15,

    //seconds
    min_length_video: 3,
    max_length_video: 600,

    //kb
    max_size_img: 300000,
    min_size_img: 0,

    //char
    max_text: 0,
    min_text: 2200,


}

]


const notSupportedYet = [
    {   pk: 2,
        name: "instagram",
        file_types:[{
            pk: 1,
            name:"mp4"
        },
        {
            pk: 2,
            name:"jpg"
        },
        {
            pk: 3,
            name:"png"
        }
        ],
        //kb
        max_size_video: 650000,
        min_size_video: 1,
    
        //seconds
        min_length_video: 3,
        max_length_video: 60,
    
        //kb
        max_size_img: 650000,
        min_size_img: 1,
    
        //char
        max_text: 2200,
        min_text: 0,
    
    },
    {   pk: 4,
        name: "facebook",
        file_types:[{
            pk: 1,
            name:"mp4"
        },
        {
            pk: 2,
            name:"jpg"
        },
        {
            pk: 3,
            name:"png"
        }
        ],
        //kb
        max_size_video: 0,
        min_size_video: 0,
    
        //seconds
        min_length_video: 0,
        max_length_video: 0,
    
        //kb
        max_size_img: 0,
        min_size_img: 0,
    
        //char
        max_text: 0,
        min_text: 0,
    
    },
]
export default platformInformation
