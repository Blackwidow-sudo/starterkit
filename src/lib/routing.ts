export type Route = {
	name: string
	path: string
	public?: boolean
}

export const routes: Route[] = [
	{
		name: 'Home',
		path: '/',
		public: true
	},
	{
		name: 'Wishes',
		path: '/wishes',
		public: false
	},
	{
		name: 'Login',
		path: '/auth/login',
		public: true
	},
	{
		name: 'Register',
		path: '/auth/register',
		public: true
	},
	{
		name: 'Profile',
		path: '/profile',
		public: false
	}
]
