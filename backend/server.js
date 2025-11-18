// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para recibir mensajes
app.post('/api/mensajes', async (req, res) => {
  try {
    const { nombre, email, mensaje, telefono } = req.body;

    // Validar que los campos requeridos existan
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: nombre, email, mensaje' 
      });
    }

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('mensajes')
      .insert([
        {
          nombre,
          email,
          mensaje,
          telefono: telefono || null,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error de Supabase:', error);
      return res.status(500).json({ error: 'Error al guardar el mensaje' });
    }

    res.status(201).json({ 
      message: 'Mensaje guardado exitosamente',
      data 
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener todos los mensajes (opcional, para admin)
app.get('/api/mensajes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mensajes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Error al obtener mensajes' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
});
