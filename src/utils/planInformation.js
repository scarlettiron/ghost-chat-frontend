const planInformation = [
    {
        plan_id: "default",
        title: "basic",
        price: 0,
        number_of_users: 1,
        number_of_platforms: 1,
        number_of_accounts_per_platform: 2, 
        number_of_total_accounts: 1,
        //in kb
        max_storage: '500 MB',
        // maximum number of posts per month alloted 
        max_number_of_posts: 8,

        //maximum post size
        //in kb
        maximum_post_size : '50 MB',

        get details() { return [
            `Users: ${this.number_of_users} `,
            `Number of platforms: ${this.number_of_platforms}`,
            `Number of accounts per social media platform: ${this.number_of_accounts_per_platform} `,
            `Number of total social media accounts: ${this.number_of_total_accounts}`,
            `Storage: ${this.max_storage}`,
            `Number of posts per month: ${this.max_number_of_posts}`,
            `Maximum post size: ${this.maximum_post_size}`,

        ]},
        
        background:'plan-bg1',

    },
    {
        plan_id: "creator",
        title: "creator",
        price: 2500,
        number_of_users: 1,
        number_of_platforms: 4,
        number_of_accounts_per_platform: 2, 
        number_of_total_accounts: 8,

         //in kb
         max_storage:'3 GB',
        
         // maximum number of posts per month alloted 
         max_number_of_posts: 50,

        //maximum post size
        //in kb
        maximum_post_size : '50 MB',

        get details() { return [
            `Users: ${this.number_of_users} `,
            `Number of platforms: ${this.number_of_platforms}`,
            `Number of accounts per social media platform: ${this.number_of_accounts_per_platform} `,
            `Number of total social media accounts: ${this.number_of_total_accounts}`,
            `Storage: ${this.max_storage}`,
            `Number of posts per month: ${this.max_number_of_posts}`,
            `Maximum post size: ${this.maximum_post_size}`,

        ]},
        background:'plan-bg2',
    },
    {
        plan_id: "agent",
        title: "agent",
        price: 5000,
        number_of_users: 2,
        number_of_platforms: 7,
        number_of_accounts_per_platform: 2, 
        number_of_total_accounts: 14,
         //in kb
         max_storage: '5 GB',
        // maximum number of posts per month alloted 
        max_number_of_posts: 100,

                //maximum post size
        //in kb
        maximum_post_size : '50 MB',

        get details() { return [
            `Users: ${this.number_of_users} `,
            `Number of platforms: ${this.number_of_platforms}`,
            `Number of accounts per social media platform: ${this.number_of_accounts_per_platform} `,
            `Number of total social media accounts: ${this.number_of_total_accounts}`,
            `Storage: ${this.max_storage}`,
            `Number of posts per month: ${this.max_number_of_posts}`,
            `Maximum post size: ${this.maximum_post_size}`,

        ]},
        background:'plan-bg3',
    },
    {
        plan_id: "business",
        title: "business",
        price: 10000,
        number_of_users: 3,
        number_of_platforms: 10,
        number_of_accounts_per_platform: 3, 
        number_of_total_accounts: 30,
         //in kb
         max_storage: '10 GB',
        
        // maximum number of posts per month alloted 
        max_number_of_posts: 250,

        //maximum post size
        //in kb
        maximum_post_size : '50 MB',

        get details() { return [
            `Users: ${this.number_of_users} `,
            `Number of platforms: ${this.number_of_platforms}`,
            `Number of accounts per social media platform: ${this.number_of_accounts_per_platform} `,
            `Number of total social media accounts: ${this.number_of_total_accounts}`,
            `Storage: ${this.max_storage}`,
            `Number of posts per month: ${this.max_number_of_posts}`,
            `Maximum post size: ${this.maximum_post_size}`,

        ]},
        background:'plan-bg4',
    },

]

export default planInformation