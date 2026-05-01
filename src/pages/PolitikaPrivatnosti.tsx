import { Box, Typography } from '@mui/material'

const sections = [
  {
    title: '1. Podaci koje prikupljamo',
    content: 'Možemo prikupljati sledeće vrste podataka:',
    list: [
      'Podaci o lokaciji – kako bismo omogućili navigaciju i prikaz obližnjih mesta kao što su restorani, kafići i turističke atrakcije',
      'Korisnički sadržaj – kao što su recenzije, ocene, komentari i deljena iskustva',
      'Podaci o uređaju – uključujući model uređaja, operativni sistem i verziju aplikacije',
      'Podaci o korišćenju – informacije o tome kako korisnici koriste aplikaciju',
    ],
    footer: 'Ne prikupljamo lične podatke poput imena ili email adrese osim ako ih korisnik dobrovoljno ne dostavi.',
  },
  {
    title: '2. Kako koristimo podatke',
    content: 'Prikupljene podatke koristimo da:',
    list: [
      'Prikažemo preporuke i destinacije u blizini',
      'Omogućimo navigaciju do izabranih lokacija',
      'Prikažemo recenzije i iskustva korisnika',
      'Poboljšamo rad i funkcionalnost aplikacije',
      'Prikažemo relevantne reklame',
      'Obezbedimo bezbednost i sprečimo zloupotrebe',
    ],
  },
  {
    title: '3. Reklame',
    content:
      'Aplikacija koristi usluge oglašavanja trećih strana (kao što je Google AdMob) za prikaz reklama. Ove usluge mogu prikupljati i koristiti podatke kao što su identifikatori uređaja, podaci o korišćenju i približna lokacija radi prikazivanja personalizovanih reklama.\n\nKorisnici mogu kontrolisati personalizaciju reklama kroz podešavanja svog uređaja.',
  },
  {
    title: '4. Korisnički sadržaj i moderacija',
    content:
      'Korisnici mogu postavljati komentare, recenzije i drugi sadržaj. Sav sadržaj može biti pregledan i odobren pre nego što postane javno vidljiv.\n\nZadržavamo pravo da uklonimo ili odbijemo sadržaj koji je neprimeren, netačan ili krši pravila korišćenja.',
  },
  {
    title: '5. Deljenje podataka',
    content: 'Ne prodajemo podatke korisnika. Podatke možemo deliti u ograničenom obimu sa:',
    list: [
      'Partnerima za oglašavanje',
      'Servisima za analitiku i hosting',
      'Nadležnim organima kada je to zakonom propisano',
    ],
  },
  {
    title: '6. Lokacijske usluge',
    content:
      'Aplikacija koristi podatke o lokaciji radi navigacije i lokalnih preporuka. Korisnici mogu u svakom trenutku uključiti ili isključiti pristup lokaciji kroz podešavanja uređaja.',
  },
  {
    title: '7. Bezbednost podataka',
    content:
      'Preduzimamo razumne mere kako bismo zaštitili podatke od neovlašćenog pristupa, izmene ili otkrivanja.',
  },
  {
    title: '8. Prava korisnika',
    content: 'Korisnici imaju pravo da:',
    list: [
      'Zatraže brisanje svojih podataka ili sadržaja',
      'Isključe lokacijske usluge',
      'Kontaktiraju nas u vezi sa privatnošću',
    ],
  },
  {
    title: '9. Usluge trećih strana',
    content:
      'Aplikacija može koristiti usluge trećih strana (kao što su mape, analitika i oglašavanje), koje mogu prikupljati podatke u skladu sa svojim politikama privatnosti.',
  },
  {
    title: '10. Kontakt',
    content: 'Za sva pitanja u vezi sa ovom Politikom privatnosti možete nas kontaktirati na: nenad.lalosevic996@gmail.com',
  },
  {
    title: '11. Izmene Politike privatnosti',
    content:
      'Ova Politika privatnosti može biti povremeno ažurirana. Sve izmene biće objavljene unutar aplikacije.',
  },
]

export default function PolitikaPrivatnosti() {
  return (
    <Box sx={{ maxWidth: 760 }}>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={1}>
        Politika privatnosti
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Ova Politika privatnosti opisuje kako mobilna aplikacija "Where Next" prikuplja, koristi i štiti podatke korisnika.
      </Typography>

      {sections.map((section) => (
        <Box key={section.title} mb={3.5}>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={1}>
            {section.title}
          </Typography>

          {section.content.split('\n\n').map((paragraph, i) => (
            <Typography key={i} variant="body2" color="text.secondary" mb={1}>
              {paragraph}
            </Typography>
          ))}

          {section.list && (
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {section.list.map((item) => (
                <Box component="li" key={item} sx={{ mb: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {section.footer && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {section.footer}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  )
}
