import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello' });
});

routes.get('/hello', (request,response)=>{
  return response.json({message:'Heyou'})
})

export default routes;
