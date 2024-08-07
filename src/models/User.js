import { pool } from '../config/db.js'

class User {
  static async all() {
    const usuarios = await pool.execute('SELECT * FROM users')
    return usuarios[0]
  }

  static async getById(id) {
    const usuario = await pool.execute('SELECT * FROM users WHERE user_id = ?', [id])
    return usuario[0]
  }

  static async where(campo, valor) {
    const usuario = await pool.execute(`SELECT * FROM users WHERE ${campo} = ?`, [valor])
    return usuario[0]
  }

  static async create({ fName, mName, lName, username, email, password }) {
    const campos = ['f_name', 'username', 'email', 'password']
    const values = [fName, username, email, password]

    if (mName) {
      campos.push('m_name')
      values.push(mName)
    }

    if (lName) {
      campos.push('l_name')
      values.push(lName)
    }

    const camposString = campos.join(', ')
    const placeholders = values.map(() => '?').join(', ')

    const nuevoUsuario = await pool.execute(`INSERT INTO users(${camposString}) VALUES (${placeholders})`, values)

    return nuevoUsuario
  }

  static async UpdateT({id, fName, mName, lName, username, email, password }) {
    const campos = ['f_name=?', 'm_name=?', 'l_name=?', 'username=?', 'email=?', 'password=?']
    const values = [fName, mName, lName, username, email, password,id]

    const camposString = campos.join(', ')

    const usuarioActualizado = await pool.execute(`UPDATE users SET ${camposString} WHERE user_id=? `, values)

    return usuarioActualizado
  }


  /* static async updateParcial({ fName, mName, lName, username, email, password }) {


    if (!name) {
      return res.status(400).json({ message: 'Falta el nombre de la categoría en el formulario' })
    }

    const [existingCategory] = await pool.execute('SELECT * FROM categories WHERE categoryid = ?', [id])
    if (existingCategory.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    const [result] = await pool.execute('UPDATE categories SET name = ? WHERE categoryid = ?', [name, id])

    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: 'Hubo un error al actualizar la categoría' })
    }

    res.json({ message: 'Categoría actualizada' })
  } */
}

export default User
