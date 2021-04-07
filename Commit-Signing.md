This guide will show you how you can configure your development setup to automatically sign git commits using GPG.

### Prerequisites

Before starting, make sure you follow the [Prerequisites, How To Contribute](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites) guide.

### Install Tools

Per platform


### Generate Signing Key

#### Ubuntu 18.04

Run:

```
gpg --full-generate-key
```

With the following options:

- Kind of key: `RSA and RSA (default)`
- Keysize: `4096`
- Expiration: `0` (does not expire)
- Real Name: use your real name
- Email address: use your Microsoft email address
- Commit: `Key for signing commits for Microsoft`

In the following example, `DF536B632D7967F9` is the **key ID**:

```sh
$ gpg --list-secret-keys --keyid-format LONG
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
/home/joao/.gnupg/pubring.kbx
-----------------------------
sec   rsa4096/DF536B632D7967F9 2021-04-07 [SC]
      1D0FC7C0350BB570143C934FDF536B632D7967F9
uid                 [ultimate] Joao Moreno (Key for signing commits for Microsoft) <joao.moreno@microsoft.com>
ssb   rsa4096/41FC60C87D442095 2021-04-07 [E]
```

You can use your key ID to get your **public key**:

```sh
$ gpg --armor --export DF536B632D7967F9
-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----
```

### Configure Git

For all platforms

---

**Reference**:

- [GitHub: About commit signature verification](https://docs.github.com/en/github/authenticating-to-github/about-commit-signature-verification)
- [GitHub: Signing commits](https://docs.github.com/en/github/authenticating-to-github/signing-commits)
- [ ]