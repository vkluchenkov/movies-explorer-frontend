export interface AuthPageProps {
  type: 'signin' | 'signup';
}

export interface AuthContent {
  title: string;
  buttonText: string;
  hint: string;
  link: '/signup' | '/signin';
  linkText: string;
}
