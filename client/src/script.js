function fly() {

    const ball = document.querySelector('#ball')
    const ball2 = document.querySelector('#ball2')
    const container = document.querySelector('.containerBall')

    const container_info = {
        w: container.clientWidth,
        h: container.clientHeight
    }
    console.log(container.clientWidth);
    console.log(container.clientHeight);


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }



    const ball_info = {
        x: 0,
        y: 0,
        vx: 2,
        vy: 2,
        rotate: 135,
        w: ball.getBoundingClientRect().width,
        h: ball.getBoundingClientRect().height
    }
    const ball_info2 = {
        x: container_info.w - 80,
        y: 200,
        rotate: 135,
        vx: 2,
        vy: 2,
        w: ball2.getBoundingClientRect().width,
        h: ball2.getBoundingClientRect().height
    }

    function updatePositionInformation(info) {
        info.x += info.vx
        info.y += info.vy
    }

    function translateDomElement(el, info) {
        el.style.transform = `translate(${info.x}px, ${info.y}px) rotate(${info.rotate}deg)`
    }

    function checkXPosition(el_info, container_info) {
        // console.log(container_info);
        return el_info.x < 0 || el_info.x > container_info.w - el_info.w
    }

    function checkYPosition(el_info, container_info) {
        return el_info.y < 0 || el_info.y > container_info.h - el_info.h
    }

    function setYDirection(yDirection) {
        ball_info.vy = yDirection
    }

    function setXDirection(xDirection) {
        ball_info.vx = xDirection
    }

    function boundaries(el_info, x_out, y_out) {
        if (x_out) {
            let angle = (el_info.vx / el_info.vy) * (180 / Math.PI)
            el_info.vx *= -1
            if (angle < 0) {
                el_info.rotate -= 90;
            } else {
                el_info.rotate += 90;
            }
        }

        if (y_out) {
            let angle = (el_info.vx / el_info.vy) * (180 / Math.PI)
            el_info.vy *= -1
            if (angle < 0) {
                el_info.rotate += 90;
            } else {
                el_info.rotate -= 90;
            }
        }
    }


    function render() {
        updatePositionInformation(ball_info)
        translateDomElement(ball, ball_info)

        boundaries(
            ball_info,
            checkXPosition(ball_info, container_info),
            checkYPosition(ball_info, container_info),
        )
        updatePositionInformation(ball_info2)
        translateDomElement(ball2, ball_info2)

        boundaries(
            ball_info2,
            checkXPosition(ball_info2, container_info),
            checkYPosition(ball_info2, container_info),
        )

        requestAnimationFrame(render)
    }

    render()
}

export default fly;