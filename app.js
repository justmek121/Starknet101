const axios = require('axios');
async function makeRequest() {
  try {
    const response = await axios({
      method: 'post', // curl defaults to GET unless data is provided, then POST
      url: 'https://orochi.network/onactive',
      headers: {
        'accept': 'text/x-component',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'text/plain;charset=UTF-8',
        'cookie': '_ga=GA1.1.1617813783.1740847745; __Host-onactive-auth.csrf-token=bc6af7e44206efc9fa94e2d9f6c4b45e36beef6fecfec9d078c97578f1415e37%7C9ce47458ea47d77a3757b1bfd8f86217254379524e8df61d1cdc63e65b835c80; __Secure-onactive-auth.callback-url=https%3A%2F%2Forochi.network%2Fonactive; __Secure-onactive-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..6gx3hRPm0Edkd1EA.QEQIrPXTsTc8Bd4p0E7NVgWzFb9il0b0cbcu-q90Wt4LM5CofZR319DRyozWLNA5A62mAcXHADK-e-DI96Pxaq6R-2v1lVyurY_Ta3IRfog4iQxhBugc-OUqXogo0wpBgzdVd_O_6PEJY7o_zO_xgT0O5BgvL86dGyuCnefzVilVG0WfgHcBdOKIkFF7IkVeB7asGcDCFp2-HZf-8dGMNzq_isCBOw7WZIkW0ydSHo1Doyg1lOQ59l91Dihkk11hzmQq9pUtgxTJ07UbwISqmP0hrUkun5gHNZWjdtRRdIEHbzig7bQ5eYW8VfvLPCyMTg8U3HKGKWh6jdkGgUI0xvVoegUgUdLhJxHcVvgYRHxJFErkvpVgbrN4tVKf06QEKTwBbLVVdUJFtjvYfOFmwS0CZie1K5lxhQ9nbGgynKP-dI4nK8as-Z9eHZD2RyHo5bL-sU4DwhbT6chF6P8b6LTQH5phAzJJs1JGqAFuz2H3HEpQA43UtZICx-PGYiV9bvPdo0kKBaI4vUXkvP__4jv0T3I0YYFQddyPeAYyiZkH79a9sxwlWsWgYXEPoJGvi9B1XyIVEViTvqzCP5XJAdt3_bWz-O1cTKK9xpqFsU2g9iv3lVREBg_-8F9XbNnvNZa_JpdaYhNPeEt7oeYUKB4hgJBvuAiyseJDxKZIn6K2Z-Yq4s90xNvyXP6sBNBAc6J2DLKdFAKPBN125kQN1Vl52p4DHinjZp0.i3HdgXmkibotpH7oKJ_H9g; _ga_R9CTTLBRX9=GS1.1.1740883073.2.1.1740883682.0.0.0',
        'next-action': '0e204ac5ea05e7b92d873b85972e219f2e54a655',
        'next-router-state-tree': '["",{"children":["(onactive)",{"children":["onactive",{"children":["__PAGE__",{},\"/onactive\",\"refresh"]}]}}],null,null,true]',
        'origin': 'https://orochi.network',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://orochi.network/onactive',
        'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
      },
      data: JSON.stringify([{"code": "ON-QK8BGNKG"}]) // Convert the data-raw to JSON string
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

makeRequest();
