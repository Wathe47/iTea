export const getToken = async () => {
    const orgName = "wathsalyagamage";
    const clientID = "eC4YVI5zDy7G5eQE3fiZKjgqpQwa";
    const clientSecret = "vVvh4wt2ChgjjG8TVZX1qvY2lBtd1b98l3EvDHxqi5Ma";
    const scope = "internal_user_mgt_create internal_user_mgt_delete internal_user_mgt_list internal_user_mgt_update internal_user_mgt_view";
  
    const tokenEndpoint = `https://api.asgardeo.io/t/${orgName}/oauth2/token`;
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
    });
  
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      scope: scope,
    });
  
    try {
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: headers,
        body: body,
      });
  
      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(
          `Failed to retrieve access token: ${response.statusText}`
        );
      }
  
      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  