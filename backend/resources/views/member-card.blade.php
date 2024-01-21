<!-- memberCard.blade.php -->

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
  <title>Membership Card</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .member-card {
      width: 300px;
      height: 180px;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 20px auto;
      padding: 20px;
      text-align: center;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
    }

    .logo {
      width: 10em;
      margin-bottom: 15px;
    }

    .logo img {
      max-width: 100%;
      max-height: 100%;
    }

    .details {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      flex-direction: column;
    }

    h2 {
      color: #333;
      margin: 0;
    }

    p {
      color: #666;
      margin: 0;
    }

    @media print {
      body {
        background-color: #fff;
      }
    }
  </style>
</head>
<body>

<div class="member-card">
  <div class="logo">
    <img src="{{ asset('images/mensa-logo.png') }}" alt="Mensa">
  </div>
  <div class="details" style="">
    <p style="font-weight: 500;">{{ $user->name }}</p>
    <p style="font-size: 12px">{{ $user->membership_code }}</p>
  </div>
</div>
</body>
</html>
