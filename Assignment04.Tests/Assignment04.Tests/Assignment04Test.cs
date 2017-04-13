/* Assignment04Test.cs 
 * Assignment04 
 * 
 * Revision History:
 *      Gonzalo Ramos Zúñiga, 2017.04.04: Created
 */

using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

namespace Assignment04.Tests
{
    [TestFixture]
    public class Assignment04Test
    {
        IWebDriver driver = new ChromeDriver();
        WebDriverWait wait;

        [Test]
        public void Add_CorrectInputs_CorrectJDPowerPage()
        {
            driver.Navigate().GoToUrl("http://localhost:63342/Assignment04/new.html");
            driver.FindElement(By.Id("txtSeller")).SendKeys("Gonzalo");
            driver.FindElement(By.Id("txtAddress")).SendKeys("90 Kovac Road");
            driver.FindElement(By.Id("txtCity")).SendKeys("Cambridge");
            driver.FindElement(By.Id("txtPhone")).SendKeys("519-451-2442");
            driver.FindElement(By.Id("txtEmail")).SendKeys("gramoszuniga5711@conestogac.on.ca");
            driver.FindElement(By.Id("txtMake")).SendKeys("Ford");
            driver.FindElement(By.Id("txtModel")).SendKeys("Mustang");
            driver.FindElement(By.Id("txtYear")).SendKeys("2012");
            driver.FindElement(By.Id("btnAdd")).Click();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(d => d.FindElement(By.XPath("//dd[@id='ddLink']/a")).GetAttribute("href") == "http://www.jdpower.com/cars/Ford/Mustang/2012");
        }

        [Test]
        public void Add_IncorrectPhone_IncorrectFormatErrorMessage()
        {
            driver.Navigate().GoToUrl("http://localhost:63342/Assignment04/new.html");
            driver.FindElement(By.Id("txtSeller")).SendKeys("Gonzalo");
            driver.FindElement(By.Id("txtAddress")).SendKeys("90 Kovac Road");
            driver.FindElement(By.Id("txtCity")).SendKeys("Cambridge");
            driver.FindElement(By.Id("txtPhone")).SendKeys("123 123 1234");
            driver.FindElement(By.Id("txtEmail")).SendKeys("gramoszuniga5711@conestogac.on.ca");
            driver.FindElement(By.Id("txtMake")).SendKeys("Ford");
            driver.FindElement(By.Id("txtModel")).SendKeys("Mustang");
            driver.FindElement(By.Id("txtYear")).SendKeys("2012");
            driver.FindElement(By.Id("btnAdd")).Click();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(d => d.FindElement(By.XPath("//label[@id='txtPhone-error']")).Text == "Phone number must be in a valid format.");
        }

        [Test]
        public void Add_EmptyForm_NoSubmission()
        {
            driver.Navigate().GoToUrl("http://localhost:63342/Assignment04/new.html");
            driver.FindElement(By.Id("btnAdd")).Click();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(d => d.Url == "http://localhost:63342/Assignment04/new.html");
        }

        [Test]
        public void Search_IncorrectInput_NoResultsFoundMessage()
        {
            driver.Navigate().GoToUrl("http://localhost:63342/Assignment04/search.html");
            driver.FindElement(By.Id("txtSearch")).SendKeys("Honda");
            driver.FindElement(By.Id("btnSearch")).Click();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(d => d.FindElement(By.XPath("//div[@id='divSearch']/h4")).Text == "No results found...");
        }

        [Test]
        public void Search_CorrectInput_ResultShown()
        {
            driver.Navigate().GoToUrl("http://localhost:63342/Assignment04/new.html");
            driver.FindElement(By.Id("txtSeller")).SendKeys("Gonzalo");
            driver.FindElement(By.Id("txtAddress")).SendKeys("90 Kovac Road");
            driver.FindElement(By.Id("txtCity")).SendKeys("Cambridge");
            driver.FindElement(By.Id("txtPhone")).SendKeys("519-451-2442");
            driver.FindElement(By.Id("txtEmail")).SendKeys("gramoszuniga5711@conestogac.on.ca");
            driver.FindElement(By.Id("txtMake")).SendKeys("Ford");
            driver.FindElement(By.Id("txtModel")).SendKeys("Mustang");
            driver.FindElement(By.Id("txtYear")).SendKeys("2012");
            driver.FindElement(By.Id("btnAdd")).Click();
            driver.Navigate().GoToUrl("http://localhost:63342/Assignment04/search.html");
            driver.FindElement(By.Id("txtSearch")).SendKeys("Ford");
            driver.FindElement(By.Id("btnSearch")).Click();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(d => d.FindElement(By.XPath("//div[@id='divSearch']/div[@class='table-responsive']/table[@class='table']/tbody/tr/td[6]")).Text == "Ford");
        }
    }
}