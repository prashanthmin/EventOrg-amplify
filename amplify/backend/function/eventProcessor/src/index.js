exports.handler = async (event) => {
  console.log('Lambda invoked with event:', JSON.stringify(event));
  return { statusCode: 200, body: 'ok' };
};
