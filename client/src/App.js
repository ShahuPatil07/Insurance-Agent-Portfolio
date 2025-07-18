import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container, Box, Typography, Button, TextField, MenuItem, Snackbar, IconButton, Paper, Avatar, Grid, Tooltip, Slide, Collapse } from '@mui/material';
import { Brightness4, Brightness7, Close, ContentCopy, Email, Phone, Groups, Business, VerifiedUser, ArrowForwardIos, ExpandMore } from '@mui/icons-material';
import './App.css';
import papa from './papa.png';
import award1 from './award1.jpg';
import award2 from './award2.jpg';
import award3 from './award3.jpg';
import award4 from './award4.jpg';
import award5 from './award5.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const agent = {
  name: 'Prashant Narayan Patil',
  phone: '+91 9822650850',
  email: 'prashantpatil210874@gmail.com',
  image: papa,
};

const companies = [
  { name: 'Star Health Insurance', logo: 'https://tse2.mm.bing.net/th/id/OIP.6smI2hUWpIS5CDAtkKVuxwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'National Insurance Company', logo: 'https://www.orissapost.com/wp-content/uploads/2020/05/National-Insurance.jpeg' },
  { name: 'LIC- Life Insurance Corporation', logo: 'https://media.gettyimages.com/id/1238128416/photo/the-life-insurance-corporation-of-india-logo-is.jpg?s=1024x1024&w=gi&k=20&c=2n4Jybxh8S-5AV_lZjazSA8EhjIrV7pwcNaLEQ5FLRY=' },
  { name: 'Go-digit', logo: 'https://tse3.mm.bing.net/th/id/OIP.mT44eOOXm9JSH_f2mWMWtAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Tata AIG General Insurance', logo: 'https://tse3.mm.bing.net/th/id/OIP.snO6OQ65PCaTToJJH_mwlAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
];

const insuranceTypes = [
  'Health Insurance',
  'Life Insurance',
  'Vehicle Insurance',
  'Property Insurance',
  'Factory Insurance',
  'Other Insurances',
];

const statData = [
  { icon: <VerifiedUser fontSize="large" />, label: 'All Kinds of Insurance', value: 'Health, Life, Vehicle, House, Factory & more' },
  { icon: <Groups fontSize="large" />, label: '1000+ Satisfied Health Insurance Customers', value: 'Trusted by families and individuals' },
  { icon: <Business fontSize="large" />, label: '50+ Organizations Covered', value: 'Staff insurance for leading companies' },
];

const awards = [
  { name: 'National Insurance Company- Best Performance FY 2021-22', image: award1 },
  { name: 'Star Heath Insurnace- Execptional Performance Award', image: award2 },
  { name: 'National Insurance Company- Best Performance FY 2018-19', image: award3 },
  { name: 'Star Heath Insurnace- No. 1 in Fresh Business FY 2021-22', image: award4 },
  { name: 'Kotak Life Insurance- Recruitment Champion', image: award5 },
];

function AnimatedCounter({ end, duration = 1200 }) {
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    step();
    // eslint-disable-next-line
  }, [end]);
  return <span>{count.toLocaleString()}</span>;
}

// Helper for gradient border style (outer border only)
const getCardGradientBorder = (darkMode, theme) => ({
  background: darkMode
    ? 'linear-gradient(135deg,rgb(13, 225, 190) 0%, #232323 100%)'
    : 'linear-gradient(135deg, #FE5D26 0%, #FF9F1C 100%)',
  padding: '2px',
  borderRadius: '16px',
  display: 'inline-block',
  width: '100%',
});

// Add bounce animation style
const dropdownBounceKeyframes = {
  '@keyframes dropdown-bounce': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(6px)' },
  },
  '@keyframes dropdown-bounce-invert': {
    '0%, 100%': { transform: 'rotate(180deg) translateY(0)' },
    '50%': { transform: 'rotate(180deg) translateY(-6px)' },
  },
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', type: '' });
  const [open, setOpen] = useState(false);
  const [copyMsg, setCopyMsg] = useState('');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [showAwards, setShowAwards] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#49feec' : '#FE5D26' },
      secondary: { main: darkMode ? '#1fc2b7' : '#FF9F1C' },
      background: {
        default: darkMode ? '#000000' : '#fff8f1',
        paper: darkMode ? '#232323' : '#fff',
      },
      text: {
        primary: darkMode ? '#fff' : '#232323',
        secondary: darkMode ? '#49feec' : '#FF9F1C',
      },
      divider: darkMode ? '#1fc2b7' : '#FE5D26',
    },
    typography: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      h1: { fontFamily: 'Playfair Display, serif', fontWeight: 900, letterSpacing: '-1px' },
      h2: { fontFamily: 'Playfair Display, serif', fontWeight: 900, letterSpacing: '-1px' },
      h3: { fontFamily: 'Playfair Display, serif', fontWeight: 900, letterSpacing: '-1px' },
      h4: { fontFamily: 'Inter, sans-serif', fontWeight: 700 },
      h5: { fontFamily: 'Inter, sans-serif', fontWeight: 600 },
      h6: { fontFamily: 'Inter, sans-serif', fontWeight: 600 },
      fontWeightBold: 700,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
    },
    shape: {
      borderRadius: 8,
    },
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, type: form.type }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }
      setOpen(true);
      setForm({ name: '', phone: '', type: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyMsg(`${label} copied!`);
  };

  // Carousel logic
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % companies.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', fontFamily: 'Poppins, Roboto, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Dark Mode Toggle */}
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
          <IconButton onClick={() => setDarkMode((m) => !m)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        {/* Hero Section */}
        <Box data-aos="fade-down" sx={{
          width: '100%',
          minHeight: 320,
          background: darkMode
            ? 'linear-gradient(120deg, #232425 0%, #181a1b 100%)'
            : 'linear-gradient(120deg, #fff8f1 0%, #ffe0b2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Container maxWidth="lg" sx={{ py: 6, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar src={agent.image} alt={agent.name} sx={{ width: 200, height: 200, boxShadow: 4, border: `4px solid ${theme.palette.primary.main}`, background: '#fff' }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 260 }}>
              <Typography variant="h3" fontWeight={700} sx={{ color: darkMode ? '#fff' : '#FE5D26', mb: 1 }}>{agent.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                <Button startIcon={<Phone sx={{ color: theme.palette.primary.main }} />} href={`tel:${agent.phone}`} sx={{ color: theme.palette.primary.main, fontWeight: 600, textTransform: 'none', fontSize: 16, p: 0, minWidth: 0 }}>
                  {agent.phone}
                </Button>
                <Button startIcon={<Email sx={{ color: theme.palette.primary.main }} />} href={`mailto:${agent.email}`} sx={{ color: theme.palette.primary.main, fontWeight: 600, textTransform: 'none', fontSize: 16, p: 0, minWidth: 0 }}>
                  {agent.email}
                </Button>
              </Box>
              <Typography variant="h6" fontWeight={500} sx={{ color: theme.palette.secondary.main, mb: 2 }}>Your Trusted Insurance Advisor</Typography>
              <Typography variant="body1" sx={{ color: 'text.primary', fontSize: 18, maxWidth: 500 }}>
                Providing <span style={{ fontWeight: 600 }}>comprehensive insurance solutions</span> for individuals and organizations. Protecting your health, life, assets, and business with the best plans in the industry.
              </Typography>
            </Box>
          </Container>
        </Box>
        {/* Stats Section */}
        <Container maxWidth="lg" sx={{ py: 4 }} data-aos="fade-up">
          <Grid container spacing={4} justifyContent="center">
            {statData.map((stat, i) => (
              <Grid item xs={12} md={4} key={stat.label}>
                <Box sx={getCardGradientBorder(darkMode, theme)}>
                  <Paper elevation={0} sx={{
                    p: 4,
                    textAlign: 'center',
                    background: darkMode ? '#232323' : '#fff8f1',
                    color: 'text.primary',
                    borderRadius: '14px',
                    boxShadow: 'none',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03) translateY(-2px)' },
                  }}>
                    <Box sx={{ mb: 2, color: theme.palette.primary.main }}>{stat.icon}</Box>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>{stat.label.includes('1,000+') ? <AnimatedCounter end={1000} /> : stat.label}</Typography>
                    <Typography variant="body2">{stat.value}</Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Companies Section - Carousel */}
        <Container maxWidth="xl" sx={{ py: 4 }} data-aos="zoom-in-up">
          <Box sx={getCardGradientBorder(darkMode, theme)}>
            <Paper elevation={0} sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              bgcolor: darkMode ? '#232323' : '#fff',
              minHeight: 140,
              justifyContent: 'center',
              borderRadius: '14px',
              boxShadow: 'none',
              position: 'relative',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', gap: 8, transition: 'transform 0.6s cubic-bezier(.4,2,.6,1)', transform: `translateX(-${carouselIdx * 220}px)` }}>
              {companies.concat(companies).map((c, idx) => (
                <Box key={c.name + idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200, maxWidth: 240, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', zIndex: 2 } }}>
                  <img
                    src={c.logo}
                    alt={c.name}
                    style={{
                      height: 48,
                      width: 'auto',
                      marginBottom: 12,
                      objectFit: 'contain',
                      background: 'transparent',
                      borderRadius: 0,
                      boxShadow: 'none',
                      filter: 'none',
                      transition: 'none',
                    }}
                  />
                  <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#fff' : '#232323', textAlign: 'center', maxWidth: 180 }}>{c.name}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
              <ArrowForwardIos sx={{ color: theme.palette.primary.main, fontSize: 28, cursor: 'pointer' }} onClick={() => setCarouselIdx((carouselIdx + 1) % companies.length)} />
            </Box>
            </Paper>
          </Box>
        </Container>
        {/* Get in Touch Form - Glassmorphism */}
        <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }} data-aos="fade-up">
          <Paper elevation={0} sx={{
            p: 5,
            textAlign: 'center',
            bgcolor: darkMode ? theme.palette.background.paper : 'rgba(255,255,255,0.85)',
            borderRadius: '14px',
            minWidth: { xs: 320, sm: 500, md: 700 },
            maxWidth: 800,
            mx: 'auto',
            boxShadow: darkMode
              ? '0 0 12px 2px rgba(73,254,236,0.12), 0 2px 8px #232323'
              : '0 0 12px 2px rgba(254,93,38,0.10), 0 2px 8px #fff8f1',
          }}>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: theme.palette.primary.main }}>Get in Touch</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ color: '#888' }}>
              Enter your phone number and select the insurance you are looking for. We will contact you soon!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                fullWidth
                sx={{ input: { color: theme.palette.primary.main, fontWeight: 600 }, label: { color: theme.palette.primary.main }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.palette.primary.main }, '&:hover fieldset': { borderColor: theme.palette.secondary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } } }}
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                required
                fullWidth
                type="tel"
                inputProps={{ pattern: '[0-9]{10,}', maxLength: 15 }}
                sx={{ input: { color: theme.palette.primary.main, fontWeight: 600 }, label: { color: theme.palette.primary.main }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.palette.primary.main }, '&:hover fieldset': { borderColor: theme.palette.secondary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } } }}
              />
              <TextField
                select
                label="Insurance Type"
                name="type"
                value={form.type}
                onChange={handleFormChange}
                required
                fullWidth
                sx={{ label: { color: theme.palette.primary.main }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: theme.palette.primary.main }, '&:hover fieldset': { borderColor: theme.palette.secondary.main }, '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } } }}
              >
                {insuranceTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
              <Button type="submit" variant="contained" size="large" sx={{ mt: 2, bgcolor: theme.palette.primary.main, color: '#white', fontWeight: 600, fontSize: 18, borderRadius: 3, boxShadow: '0 2px 8px #B6F50033', transition: 'all 0.2s', '&:hover': { bgcolor: theme.palette.secondary.main, transform: 'scale(1.03)' } }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
            {/* Honours and Recognition Button */}
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 4, fontWeight: 700, borderRadius: 3, fontSize: 18, borderWidth: 2, borderColor: theme.palette.primary.main, color: darkMode ? '#fff' : '#232323', textTransform: 'none', '&:hover': { bgcolor: darkMode ? '#232323' : '#fff3e0', borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } }}
              onClick={() => setShowAwards((v) => !v)}
            >
              Honours and Recognition
              <ExpandMore
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  ml: 1,
                  transition: 'transform 0.3s',
                  transform: showAwards ? 'rotate(180deg)' : 'rotate(0deg)',
                  animation: `${showAwards ? 'dropdown-bounce-invert' : 'dropdown-bounce'} 1.2s infinite`,
                  ...dropdownBounceKeyframes,
                }}
              />
            </Button>
            <Collapse in={showAwards} sx={{ mt: 3 }}>
              <Grid container spacing={3} direction="column" alignItems="center">
                {awards.map((award, idx) => (
                  <Grid item xs={12} key={award.name}>
                    <Box sx={getCardGradientBorder(darkMode, theme)}>
                      <Paper elevation={0} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        p: 3,
                        borderRadius: '14px',
                        bgcolor: darkMode ? '#232425' : '#fff8f1',
                        boxShadow: 'none',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px) scale(1.02)' },
                      }}>
                      <Box
                        sx={{
                          width: 180,
                          height: 180,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 4,
                        }}
                      >
                        <img
                          src={award.image}
                          alt={award.name}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            borderRadius: 12,
                            border: '3px solid #bdbdbd',
                            boxShadow: '0 2px 16px #B6F50055',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            background: '#fff',
                            objectFit: 'contain',
                          }}
                          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.primary.main, fontSize: 24 }}>
                        {award.name}
                      </Typography>
                      </Paper>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
            </Paper>
          </Container>
        {/* Contact Section - Modern UI */}
        <Container maxWidth="sm" sx={{ py: 4 }} data-aos="fade-up">
          <Box sx={getCardGradientBorder(darkMode, theme)}>
            <Paper elevation={0} sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: '14px',
              bgcolor: darkMode ? '#232323' : '#f7f7f7',
              boxShadow: 'none',
              maxWidth: 600,
              mx: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ width: 6, height: 36, bgcolor: theme.palette.primary.main, borderRadius: 2, mr: 2 }} />
              <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, letterSpacing: 1 }}>
                Contact
              </Typography>
            </Box>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<Phone sx={{ color: '#000' }} />}
                  href={`tel:${agent.phone}`}
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    borderRadius: 3,
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    color: '#000',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    '&:hover': { bgcolor: theme.palette.secondary.main },
                  }}
                >
                  {agent.phone}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<Email sx={{ color: '#000' }} />}
                  href={`mailto:${agent.email}`}
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    borderRadius: 3,
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    color: '#000',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    textTransform: 'none',
                    '&:hover': { bgcolor: theme.palette.secondary.main },
                  }}
                >
                  {agent.email.toLowerCase()}
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button variant="outlined" color="primary" size="large" href={`tel:${agent.phone}`} sx={{ fontWeight: 600, fontSize: 16, borderRadius: 3, borderColor: theme.palette.primary.main, color: theme.palette.primary.main, px: 4, '&:hover': { bgcolor: darkMode ? '#232323' : '#fff3e0', borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } }}>Call Now</Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(agent.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontWeight: 600, fontSize: 16, borderRadius: 3, borderColor: theme.palette.primary.main, color: theme.palette.primary.main, px: 4, '&:hover': { bgcolor: darkMode ? '#232323' : '#fff3e0', borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } }}
              >
                Email Now
              </Button>
            </Box>
            </Paper>
          </Box>
        </Container>
        {/* Snackbar for form submission and copy */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          message={<span style={{ color: theme.palette.primary.main, fontWeight: 700 }}>You will be contacted soon!</span>}
          TransitionComponent={Slide}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={() => setError('')}
          message={<span style={{ color: 'red', fontWeight: 700 }}>{error}</span>}
          TransitionComponent={Slide}
        />
        {/* Contact Developer Link */}
        <Box sx={{ width: '100%', textAlign: 'center', py: 2, mt: 'auto', bgcolor: '#000', borderTop: '1px solid #000', position: 'relative' }}>
          <a
            href="https://www.linkedin.com/in/shahupatil07/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#999', fontSize: 16, textDecoration: 'underline', fontWeight: 700, letterSpacing: 0.1, background: 'transparent', display: 'inline-block', margin: '0px 0', padding: '2px 1px' }}
          >
            Contact Developer
          </a>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
