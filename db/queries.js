const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;  
}

async function addNewMessage(username, message) {
    await pool.query("INSERT INTO messages (username, message, added) VALUES ($1, $2, NOW())",[username, message])
}

async function getMessageById(msgid) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [msgid]);
    return rows;
}

module.exports = { getAllMessages, addNewMessage, getMessageById };