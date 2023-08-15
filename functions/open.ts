export async function onRequest( context ) {
  console.log('open.ts onRequest');
  // Reject if not a websocket request
  const upgradeHeader = context.request.headers.get('Upgrade');
  if(upgradeHeader !== 'websocket') {
    return new Response(null, { 
      status: 400,
      statusText: 'Invalid Request.' });
  }    
    
  // Open the Durable Object
  console.log('open.ts onRequest: opening DO');
  const doID = await context.env.MY_DO.newUniqueId();
  console.log(`open.ts onRequest: doID: ${doID}`);
  const doStub = context.env.MY_DO.get(doID);
  console.log(`open.ts onRequest: doStub: ${doStub}`);
  const doResponse = await doStub.fetch(context.request);
  console.log(`open.ts onRequest: doResponse: ${doResponse}`);

  // return response
  console.log('open.ts onRequest: returning response');
  return doResponse;
}
