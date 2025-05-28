# Stridr

Stridr is a web application designed for runners who train for races. It allows users to visualize their training plans on a calendar, customize workouts, and download the plans as iCal files for integration with popular calendar applications.

The project is hosted at [Stridr on GitHub Pages](https://joshua-moreton.github.io/stridr/).

## Features

- **Training Plan Visualization**: Displays training plans in an interactive calendar format.
- **Customizable Workouts**: Edit and adjust workouts to fit your schedule.
- **iCal Export**: Download training plans as iCal files for easy import into calendar apps.
- **Support for Multiple Training Plans**: Includes popular plans like Pfitzinger, FRR, and more.

## Running Locally

Stridr is a React application. To run it locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/joshua-moreton/stridr.git
   cd stridr
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```

Other available scripts:

- `yarn test`: Run tests.
- `yarn build`: Build the application for production.
- `yarn preview`: Preview the production build.

## Contributing

We welcome contributions! If you have a bugfix, feature request, or new training plan, feel free to:

- Open a GitHub issue.
- Submit a pull request.

## Training Plans

Training plans are stored as YAML files for easy editing. They can be found in the `public/plans/yaml/` directory. These plans are converted to JSON for the application to consume.

### Validating Plans

Plans can be validated against a JSON schema located at `public/schema/plan-schema.json`:

```bash
# Install ajv-cli globally
npm install -g ajv-cli

# Validate plans
yarn run validatePlans
```

### Converting Plans

To convert YAML plans to JSON:

```bash
python3 -m venv my_env
source my_env/bin/activate
pip install pyyaml
python3 ./bin/convertPlans
```

## Deployment

Stridr is deployed to GitHub Pages using GitHub Actions. Any changes pushed to the `main` branch will automatically trigger a deployment.

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.
