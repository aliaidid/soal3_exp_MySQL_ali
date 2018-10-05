var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'toko'
})

db.connect(()=>{
    console.log("Database Connected to MySQL!")
});


router.get('/karyawan', (req, res) => {
    var sql = 'SELECT * FROM karyawan';
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result)
        res.send(result)
    });
})


router.post('/karyawan', (req, res) => {
    var time = new Date();
    var year = time.getFullYear();

    var data = {
        nama: req.body.nama,
        tglLahir: req.body.tglLahir
    }
    var name = data.nama
    var arraytgl = data.tglLahir.split("-")

    function zodiac(day, month) {
        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            var bintang = "Capricorn"
            return bintang;
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            var bintang = "Aquarius"
            return bintang;
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            var bintang = "Pisces"
            return bintang;
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            var bintang = "Aries"
            return bintang;
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            var bintang = "Taurus"
            return bintang;
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            var bintang = "Gemini"
            return bintang;
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            var bintang = "Cancer"
            return bintang;
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            var bintang = "Leo"
            return bintang;
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            var bintang = "Virgo"
            return bintang;
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            var bintang = "Libra"
            return bintang;
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            var bintang = "Scorpio"
            return bintang;
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            var bintang = "Sagittarius"
            return bintang;
        }
    }

    var birthday = year - arraytgl[2];

    var input = {
        nama: name,
        hari: arraytgl[0],
        bulan: arraytgl[1],
        tahun: arraytgl[2],
        zodiak: zodiac(arraytgl[0], arraytgl[1]),
        usia: birthday
    }
    var sql = 'INSERT INTO karyawan SET ?';
    db.query(sql, input, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send({
            status: 'Post Data Success!',
            nama: name,
            hari: arraytgl[0],
            bulan: arraytgl[1],
            tahun: arraytgl[2],
            zodiak: zodiac(arraytgl[0], arraytgl[1]),
            usia: birthday
        })
    });
});


module.exports = router;