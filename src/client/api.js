const addMessage = () => {
  return fetch('http://localhost:4000/graphql', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: 'mutation Message($id: ID!) { addMessage(id: $id) { id name } }',
      variables: {
        id: "xyz"
      }
    })
  }).then(res => {
    return res.json();
  }).then(res => {
    console.log(res);
  });
};

export const message = {
  add: addMessage
};
