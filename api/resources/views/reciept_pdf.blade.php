<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Resi Gudang</title>
    <style>
        body{
            font-family: Verdana, Geneva, Tahoma, sans-serif
        }
    </style>
</head>
<body >
    
    <h5 style="padding: 0px 36px">{{$reciept[0]->created_at->format('Y-m-d')}}</h5>
    <h1 style="text-align: center">Resi Gudang</h1>
    <div style="padding:24px 36px">
    <p>Atas Nama</p>
    <table style="width: 60%; margin-left:30px">
        <tr>
            <td style="width:30%">Nama</td>
            <td style="width: 10px">:</td>
            <td>{{$reciept[0]->comodity->seller->username}}</td>
        </tr>
        <tr>
           
        </tr>
    </table>
    <p>Memiliki komoditas sebagai berikut</p>
    <table style="width: 60%; margin-left:30px">
        <tr>
            <td style="width:30%">Komoditas</td>
            <td style="width: 10px">:</td>
            <td>{{$reciept[0]->comodity->comodityType->name}}</td>
        </tr>
        <tr>
            <td style="width:30%">Jumlah</td>
            <td style="width: 10px">:</td>
            <td>{{$reciept[0]->amount/1000}} ton</td>
        </tr>
        <tr>
            <td style="width:30%">Biaya Simpan</td>
            <td style="width: 10px">:</td>
            <td>{{$reciept[0]->storage_cost}}</td>
        </tr>
    </table>
</div>
</body>
</html>