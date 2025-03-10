const UserModel= require("../model/userModel")


  //post method
exports.createUser = async(req , res)=>{
try {
    const {name , email , password} = req.body

    if(!name){
      return res.status(400).json({
        message : "Please enter your name"
      })
    }else if(!email){
      return res.status(400).json({
        message : "Please enter your email"
      })
    }else if(!password){
      return res.status(400).json({
        message : "Please enter your password"
      })
    }else if(!name && !email && !password){
      return res.status(400).json({
        message : "all fields must be filled"
      })
    }

    const newUser = await UserModel.create({
        name , email , password
    })
    return res.status(201).json({
        message : "user signed up",
        data : newUser
    })
} catch (error) {
    console.error("unable to sign up" , error)
}
  }

//get method 
exports.getAllUsers = async(req , res)=>{
  try {
    const users = await UserModel.find()

    if(!users){
      return res.status(400).json({
        message : "couldn't get users , collection is empty"
      })
    }
    return res.status(200).json({
      message : "gotten all users",
      data : users
    })

  } catch (error) {
    return res.status(500).json({
      message : error.message,
      name : error.name
    })
  }
}


//get one method 
exports.getOneById = async(req , res)=>{
  try {
 
    const users = await UserModel.findById(req.params.id).populate({path : "Products"})
    return res.status(200).json({
      message : "gotten the user",
      data : users
    })
  } catch (error) {
    return res.status(400).json({
      message : error.message,
      name : error.name
    })
  }
}

exports.getOneByName = async(req , res)=>{
  try {
    const {name} = req.body
    if(!name){
      return res.status(404).json({
        message : "Please enter a name"
      })
    }
    const users = await UserModel.findOne({name})
    return res.status(200).json({
      message : "gotten the user",
      data : users
    })
  } catch (error) {
    return res.status(400).json({
      message : "couldn't get user",
      error
    })
  }
}

//update method
exports.updateUser = async(req, res)=>{
  try {
    const {id} = req.params
    const {password , name} = req.body
    const update = await UserModel.findByIdAndUpdate(id , {password , name} , {new:true})
    // const update = await UserModel.findByIdAndUpdate(req.params.id , req.body.password , {new:true})
    return res.status(202).json({
      message : "updated",
      data : update
    })
  } catch (error) {
    return res.status(400).json({
      message : "failed to update user",
      error
    })
  }
}
exports.updateUser2 = async(req, res)=>{
  try {
    const {password , name} = req.body
    const update = await UserModel.findOneAndUpdate({password , name} , {new:true})
    // const update = await UserModel.findByIdAndUpdate(req.params.id , req.body.password , {new:true})
    return res.status(202).json({
      message : "updated",
      data : update
    })
  } catch (error) {
    return res.status(400).json({
      message : "failed to update user",
      error
    })
  }
}

//delete method
exports.deleteUser = async(req, res)=>{
  try {
    const removeUser = await UserModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      message :"user deleted",
      data : removeUser
    })
  } catch (error) {
    return res.status(400).json({
      message : "couldn't delete user",
      error
    })
  }
}