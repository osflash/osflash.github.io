const isLocalhost = Boolean(
  window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' || // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export const register = async (config?: Config): Promise<void> => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', async () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        await navigator.serviceWorker.ready;

        const message =
          'This web app is being served cache-first by a service  worker. To learn more, visit https://bit.ly/CRA-PWA';
        console.log(message);
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
};

const registerValidSW = async (swUrl: string, config?: Config): Promise<void> => {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) return;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            const message =
              'New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.';
            console.log(message);

            // Execute callback
            if (config && config.onUpdate) config.onUpdate(registration);
          } else {
            const message = 'Content is cached for offline use.';
            console.log(message);

            // Execute callback
            if (config && config.onSuccess) config.onSuccess(registration);
          }
        }
      };
    };
  } catch (error) {
    const message = 'Error during service worker registration:';
    console.error(`${message} ${error}`);
  }
};

const checkValidServiceWorker = async (swUrl: string, config?: Config): Promise<void> => {
  try {
    const response = await fetch(swUrl, { headers: { 'Service-Worker': 'script' } });

    const contentType = response.headers.get('content-type');

    if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
      await navigator.serviceWorker.ready;
      window.location.reload();
    } else {
      registerValidSW(swUrl, config);
    }
  } catch (error) {
    const message = 'No internet connection found. App is running in offline mode.';
    console.log(message);
  }
};

export const unregister = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;

      await registration.unregister();
    } catch (error) {
      console.error(error);
    }
  }
};
