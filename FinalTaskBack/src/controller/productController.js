import productModel from '../model/Product.js'

export const products = async (req, res) => {
  try {
    const products = await productModel.find()
    res.json({ products })
  } catch (error) {
    console.log(error)
  }
}

export const create = async (req, res) => {
  try {
    const { title, description, imgUrl, price } = req.body
    console.log('utiputi: ', req.body)
    const result = await productModel.create({
      title, description, imgUrl, price
    })
    return res.status(201).json(result)
  } catch (error) {
    console.log(error)
  }
}

export const update = async (req, res) => {
  try {
    const id = req.params.id

    await productModel.findOneAndUpdate({
      _id: id
    }, {
      title: req.body.title,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      price: req.body.price
    })
    res.json({ msg: 'Updated' })
  } catch (error) {
    console.log(error)
  }
}

export const remove = async (req, res) => {
  try {
    const id = req.params.id
    productModel.findOneAndDelete({
      _id: id
    },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            msg: 'failed delete'
          })
        }

        if (!doc) {
          return res.status(404).json({
            msg: 'Not found'
          })
        }

        res.json({
          success: true
        })
      })
  } catch (error) {
    console.log(error)
  }
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id
    productModel.findOneAndUpdate(
      { _id: id },
      {
        returnDocument: 'after'
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            msg: 'Something wrong'
          })
        }

        if (!doc) {
          return res.status(404).json({
            msg: 'Not found'
          })
        }

        res.json(doc)
      }

    )
  } catch (error) {
    console.log(error)
  }
}