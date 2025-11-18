<script setup lang="ts">
interface SocialMedia {
  name: string;
  href: `https://${string}.com`;
  icon: `pi-${string}`;
}

const socialLinks: SocialMedia[] = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com",
    icon: "pi-linkedin",
  },
  {
    name: "Github",
    href: "https://github.com",
    icon: "pi-github",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: "pi-facebook",
  },
  {
    name: "X",
    href: "https://x.com",
    icon: "pi-twitter",
  },
];
</script>

<template>
  <footer class="footer">
    <div class="footer-row footer-row-1">
      <h3>Contacts</h3>
      <ul class="social-media">
        <li v-for="item in socialLinks" :key="item.name">
          <a :href="item.href" target="_blank" :aria-label="`${item.name} link`" rel="noreferer, noopener">
            <i :class="`pi ${item.icon}`"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="footer-row footer-row-2">
      <span>© {{ new Date().getFullYear() }}</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  display: flex;
  flex-direction: column;

  .footer-row {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: pxToRem(30px);
    flex-wrap: wrap;
  }

  .footer-row-1 {
    background-color: #03a9f4;
    color: black;
    justify-content: space-between;
    padding: pxToRem(15px) pxToRem(40px) pxToRem(15px) pxToRem(15px);
    gap: 1rem 3rem;

    h3 {
      font-size: pxToRem(30px)
    }
  }

  .footer-row-2 {
    background-color: black;
    color: white;
    padding: pxToRem(15px);
    justify-content: center;
    font-size: pxToRem(18px);
  }

  .social-media {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: pxToRem(5px) pxToRem(15px);

    li {
      list-style: none;

      span {
        color: black;
      }
    }

    i {
      color: black;
      font-size: pxToRem(30px);
    }
  }

  @media screen and (max-width: 480px) {
    .footer-row {
      font-size: pxToRem(22px);
    }
  }
}
</style>
