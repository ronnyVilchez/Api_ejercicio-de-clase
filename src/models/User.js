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

  static async UpdateT({ id, fName, mName, lName, username, email, password }) {
    const campos = ['f_name=?', 'm_name=?', 'l_name=?', 'username=?', 'email=?', 'password=?']
    const values = [fName, mName, lName, username, email, password, id]

    const camposString = campos.join(', ')

    const usuarioActualizado = await pool.execute(`UPDATE users SET ${camposString} WHERE user_id=? `, values)

    return usuarioActualizado
  }


  static async updateP({ id, fName, mName, lName, username, email, password }) {
    const campos = []
    const values = [id]

    if (fName) {
      campos.push('f_name=?,')
      values.unshift(fName)
    }
    if (mName) {
      campos.push('m_name=?,')
      values.unshift(mName)
    }
    if (lName) {
      campos.push('l_name=?,')
      values.unshift(lName)
    }
    if (username) {
      campos.push('username=?,')
      values.unshift(username)
    }
    if (email) {
      campos.push('email=?,')
      values.unshift(email)
    }
    if (password) {
      campos.push('password=?,')
      values.unshift(password)
    }

    const camposString = campos.join(' ').slice(0, -1)

    const usuarioActualizado = await pool.execute(`UPDATE users SET ${camposString} WHERE user_id=? `, values)
    return usuarioActualizado


  }

  static async delet({ id }) {

    const usuario = await pool.execute(`DELETE FROM users WHERE user_id =?`, [id])
    return usuario[0]
  }

}

export default User
