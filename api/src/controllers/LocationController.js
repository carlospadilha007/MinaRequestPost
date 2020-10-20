const db = require('../database/connection');
const { insideCircle } = require('geolocation-utils');

const RADIUS = 900 //qtd de metros de raio

function usersInCircle(user ,users){
  const {latitude, longitude, id} = user[0]
  const center = {lat: Number(latitude), lon: Number(longitude)};

  const filteredUsers = users.filter((us)=>{
    const {latitude, longitude} = us;

    if(us.id === id){
      return false
    }

    return insideCircle({lat: Number(latitude), lon: Number(longitude)}, center, RADIUS)
  })

  return filteredUsers

}

module.exports = class LocationController{
  
  async listLocations(req, res){
    //primeiro dar um verificar se existe, se sim retornar os usuarios locais, se nao criar e apos retornar
    const {id, latitude, longitude} = req.body;
    const trx = await db.transaction();
    
    try {
      const user = await db('user_locations').where('id', id)

      if(user.length == 1){

        const users = await db('user_locations').select('*');
        const closeUsers = usersInCircle(user, users)

        res.status(200).json(closeUsers)

      } else {
        await trx('user_locations').insert({
          id,
          latitude,
          longitude
        });
    
        const users = await trx('user_locations').select('*');
        await trx.commit();
        res.json({users});
      }

    } catch (error) {
      res.status(500).send('Error '+ error)
    }
  }

  async deleteLocation(req, res){
    const { id }= req.params;

    try {
      const response = await db('user_locations').where('id', id).del();
      res.status(204).json(response)
    } catch (error) {
      res.status(500).send(error)
    }

  }
} 