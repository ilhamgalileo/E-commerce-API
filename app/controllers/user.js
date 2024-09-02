const { db } = require('../models/')
const User = db.user
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // Periksa apakah email sudah digunakan
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email sudah digunakan'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Buat pengguna baru
        const user = new User({ name, email, password: hashedPassword })
        await user.save()

        return res.status(201).json({
            status: 'success',
            message: 'Pendaftaran berhasil',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Error during registration:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan server'
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Email atau password salah'
            })
        } console.log(user.password)

        // Verifikasi password
        const isPasswordMatch = await bcrypt.hashSync(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Email atau password salah'
            })
        }

        // Generate JWT token
        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        return res.status(200).json({
            status: 'success',
            message: 'Login berhasil',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Error during login:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan server'
        })
    }
}

